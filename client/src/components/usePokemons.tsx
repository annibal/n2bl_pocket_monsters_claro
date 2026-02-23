/* eslint-disable react-hooks/set-state-in-effect */
import useEnv from "@/components/EnvContext";
import type { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";

export interface UsePokemonsProps {
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: "name" | "id";
  orderDir?: "asc" | "desc";
}

export interface UsePokemonsReturn {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  }
}

export default function usePokemons(props: UsePokemonsProps): UsePokemonsReturn {
  const { page = 0, limit = 20, search = "", orderBy = "id", orderDir = "asc" } = props;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [meta, setMeta] = useState<UsePokemonsReturn["meta"]>({ limit: 0, page: 0, total: 0, totalPages: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
    setError("");
    setPokemons([]);

    try {
      fetch(url)
        .then((r) => r.json())
        .then((r) => {
          if (r.data) {
            setPokemons(r.data);
          } else {
            throw new Error("Unexpected return structure - cannot find data property");
          }
          if (r.meta) {
            setMeta(r.meta);
          } else {
            throw new Error("Unexpected return structure - cannot find meta property");
          }
        });
    } catch (err: unknown) {
      // @ts-expect-error AAAAAAAAAAAAAAAAA
      serError(err?.message || err);
    }
    setIsLoading(false);
  }, [url]);

  return { pokemons, meta, error, isLoading };
}
