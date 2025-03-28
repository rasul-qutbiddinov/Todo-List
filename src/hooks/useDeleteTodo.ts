// src/hooks/useDeleteTodo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gettodo"] });
    },
  });
};
