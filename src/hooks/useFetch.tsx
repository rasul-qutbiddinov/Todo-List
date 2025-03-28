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
      return await api.get(url).then((res) => res?.data);
    },
  });
}

export default useFetch;
