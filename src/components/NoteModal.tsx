import { useEffect, useState } from "react";
import { INoteTypes } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    completed?: boolean;
  }) => void;
  defaultValues?: INoteTypes | null;
}

const NoteModal = ({ isOpen, onClose, onSubmit, defaultValues }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (defaultValues && isOpen) {
      setTitle(defaultValues.title);
      setDescription(defaultValues.description);
      setCompleted(defaultValues.completed);
    }

    if (!defaultValues && isOpen) {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [defaultValues, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold dark:text-white">
          {defaultValues ? "Edit Note" : "Add Note"}
        </h2>

        <div className="space-y-4">
          {/* Title input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />

          {/* Description input */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />

          {/* ✅ Completed checkbox – faqat edit holatda ko‘rsatiladi */}
          {defaultValues && (
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-white">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="form-checkbox accent-indigo-500"
              />
              <span>Completed</span>
            </label>
          )}

          {/* Buttons */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-1 text-sm dark:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              disabled={!title || !description}
              onClick={() =>
                onSubmit({
                  title,
                  description,
                  completed,
                })
              }
              className="rounded bg-indigo-600 px-4 py-1 text-sm text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
