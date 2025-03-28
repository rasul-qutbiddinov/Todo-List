// src/pages/auth/signin.tsx
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { IAuthTypes } from "../../types";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const register = useMutation({
    mutationFn: async (data: IAuthTypes) => {
      const response = await api.post("auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      localStorage.setItem("tempUser", JSON.stringify({ username, password }));
      navigate("/login");
    },
    onError: (err) => {
      const error = err as Error;
      console.log(error.message);
    },
  });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register.mutate({ username, password });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[50%] rounded-2xl border border-slate-200 p-10 shadow"
      >
        <h2 className="mb-6 text-center text-3xl font-bold">Sign In</h2>

        <div className="mb-5">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={handleUsername}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={handlePassword}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
        >
          Submit
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
