// src/hooks/useFetch.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

interface IProps {
  key: string[];
  url: string;
}

function useFetch({ key, url }: IProps) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get(url);
      return res.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    gcTime: 0, // ✅ V5 da cacheTime o‘rniga gcTime ishlatiladi
    staleTime: 0,
  });
}

export default useFetch;
