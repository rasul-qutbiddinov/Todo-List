import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { IAuthTypes } from "../../types";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const temp = localStorage.getItem("tempUser");
    if (temp) {
      const { username, password } = JSON.parse(temp);
      setUsername(username);
      setPassword(password);
      localStorage.removeItem("tempUser");
    }
  }, []);

  const login = useMutation({
    mutationFn: async (data: IAuthTypes) => {
      const response = await api.post("auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("username", data.username || username);
      queryClient.clear();
      navigate("/todo");
    },
    onError: () => {
      setError(t("loginError"));
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    login.mutate({ username, password });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="w-full max-w-[80%] rounded-2xl border border-slate-200 p-10 shadow"
        onSubmit={onSubmit}
      >
        <h2 className="mb-6 text-center text-3xl font-bold">{t("login")}</h2>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-2 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="username" className="block text-sm font-medium">
            {t("username")}
          </label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium">
            {t("password")}
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
        >
          {t("submit")}
        </button>

        <p className="mt-4 text-center text-sm">
          {t("dontHaveAccount")}{" "}
          <a href="/signin" className="text-indigo-600 hover:underline">
            {t("signUp")}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
