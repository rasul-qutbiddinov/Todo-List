import { useState } from "react";
import Navbar from "../../navbar";
import { Search, Trash2, Pencil } from "lucide-react";
import Logo from "../../assets/Logo.png";
import addIcon from "../../assets/Add button.png";
import useFetch from "../../hooks/useFetch";
import { IFilterType, INoteTypes } from "../../types";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import { useToggleComplete } from "../../hooks/useToggleComplete";
import NoteModal from "../../components/NoteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<IFilterType>("All");
  const [showFilter, setShowFilter] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INoteTypes | null>(null);

  const queryClient = useQueryClient();

  const { data: todos } = useFetch({ key: ["gettodo"], url: "/todos" });
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: toggleComplete } = useToggleComplete();

  console.log(todos);

  // CREATE
  const createTodo = useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      await api.post("/todos", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gettodo"] });
      setIsModalOpen(false);
    },
  });

  // UPDATE (PUT bilan va completed qiymatini ham yuboradi)
  const updateTodo = useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      description: string;
      completed?: boolean;
    }) => {
      await api.put(`/todos/${data.id}`, {
        title: data.title,
        description: data.description,
        completed: data.completed ?? false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gettodo"] });
      setIsModalOpen(false);
      setSelectedNote(null);
    },
  });

  const filteredTodos =
    todos &&
    (filter == "Completed"
      ? todos?.filter((c: INoteTypes) => c.completed)
      : filter == "Active"
        ? todos?.filter((c: INoteTypes) => !c.completed)
        : todos);

  return (
    <div className="relative min-h-screen bg-white pt-20 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Search + Filter */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex w-full max-w-md items-center rounded border border-indigo-300 px-3 py-1">
            <Search className="h-4 w-4 text-indigo-400" />
            <input
              type="text"
              placeholder="Search note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent px-2 text-sm placeholder-indigo-300 outline-none"
            />
          </div>

          <div className="relative ml-4">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="w-32 rounded bg-indigo-500 px-3 py-1 text-sm text-white"
            >
              {filter}
            </button>
            {showFilter && (
              <ul className="absolute right-0 z-10 mt-2 w-32 rounded border border-gray-300 bg-white text-sm shadow-md dark:border-gray-700 dark:bg-gray-800">
                {["All", "Completed", "Active"].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setFilter(item as IFilterType);
                      setShowFilter(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Todos list */}
        {filteredTodos && filteredTodos.length > 0 ? (
          <ul className="space-y-4">
            {filteredTodos.map((note: INoteTypes) => (
              <li
                key={note._id}
                className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-700"
              >
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={note.completed}
                    onChange={() =>
                      toggleComplete({
                        id: note._id,
                        completed: !note.completed,
                      })
                    }
                    className="form-checkbox mt-1 h-4 w-4 accent-indigo-500"
                  />

                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                      {note.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {note.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <button
                    title="Edit"
                    onClick={() => {
                      setSelectedNote(note);
                      setIsModalOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4 hover:text-indigo-500" />
                  </button>
                  <button title="Delete" onClick={() => deleteTodo(note._id)}>
                    <Trash2 className="h-4 w-4 hover:text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-10">
            <img src={Logo} alt="logo" className="h-auto w-48 opacity-90" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Empty...</p>
          </div>
        )}
      </div>

      {/* Add Note Button */}
      <button
        onClick={() => {
          setSelectedNote(null);
          setIsModalOpen(true);
        }}
        className="fixed right-35 bottom-20 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 shadow-lg transition hover:bg-indigo-600"
      >
        <img src={addIcon} alt="Add Note" className="h-8 w-8" />
      </button>

      {/* Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        defaultValues={selectedNote}
        onSubmit={(data) => {
          if (selectedNote) {
            updateTodo.mutate({ id: selectedNote._id, ...data });
          } else {
            createTodo.mutate(data);
          }
        }}
      />
    </div>
  );
};

export default Home;
