import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface TogglePayload {
  id: string;
  completed: boolean;
}

export const useToggleComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, completed }: TogglePayload) => {
      // Oldin mavjud note-ni olish kerak (title, description uchun)
      const existing = await api.get(`/todos/${id}`).then((res) => res.data);

      // PUT kerak, PATCH emas
      const updated = {
        title: existing.title,
        description: existing.description,
        completed,
      };

      const res = await api.put(`/todos/${id}`, updated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gettodo"] });
    },
    onError: (err) => {
      console.error("Toggle complete error:", err);
    },
  });
};
