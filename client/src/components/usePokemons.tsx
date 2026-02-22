import useEnv from "@/components/EnvContext";
import { useEffect, useState } from "react";

export interface UsePokemonsProps {
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: "name" | "id";
  orderDir?: "asc" | "desc";
}

export default function usePokemons(props: UsePokemonsProps) {
  const { page = 0, limit = 20, search = "", orderBy = "id", orderDir = "asc" } = props;
  const [pokemons, setPokemons] = useState([]);
  const { apiUrl } = useEnv();

  const query = new URLSearchParams();
  query.append("page", String(page));
  query.append("limit", String(limit));
  query.append("search", search);
  query.append("orderBy", orderBy);
  query.append("orderDir", orderDir);

  let url = `${apiUrl}/pokemons`;
  if (query.toString().length > 0) {
    url = `${url}?${query.toString()}`;
  }

  console.log(`usePokemons "${url}"`);
  useEffect(() => {
    console.log("Use Effect fetch");
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        console.log("r :>> ", r);
        setPokemons(r);
      });
  }, [url]);

  return { pokemons };
}
