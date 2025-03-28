import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { ITodoTypes } from "../types";
import { api } from "../lib/api";
import { queryClient } from "../main";

const PostTodos = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const create = useMutation({
    mutationFn: async (data: ITodoTypes) => {
      const response = await api.post("todos", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.prefetchQuery({ queryKey: ["gettodo"] });
    },
    onError: (err) => {
      const error = err as Error;
      console.log(error.message);
    },
  });

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const data: ITodoTypes = { title, description };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    create.mutate(data);

    console.log({ title, description });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full">
        <form
          className="mx-auto w-full max-w-[50%] rounded-2xl border-1 border-slate-200 p-10"
          onSubmit={onSubmit}
        >
          <h2 className="mb-6 text-center text-3xl">Login</h2>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@flowbite.com"
              required
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your description
            </label>
            <input
              type="description"
              id="description"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              value={description}
              onChange={handleDescription}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTodos;
