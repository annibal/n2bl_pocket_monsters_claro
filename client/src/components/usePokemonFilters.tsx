/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import useEnv from "@/components/EnvContext";

export interface PokemonFilters {
  gender_rate: number[];
  base_happiness: number[];
  is_baby: boolean[];
  has_gender_differences: boolean[];
  generation: string[];
  is_legendary: boolean[];
  is_mythical: boolean[];
  region: string[];
  color: string[];
  shape: string[];
  type1: string[];
  egg_group1: string[];
}

export interface UsePokemonFiltersReturn {
  data: PokemonFilters | null;
  isLoading: boolean;
  error: string | null;
}

export default function usePokemonFilters():UsePokemonFiltersReturn {
  const { apiUrl } = useEnv();
  const [data, setData] = useState<PokemonFilters | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    setError(null);

    try {
      fetch(`${apiUrl}/pokemons/filters`)
        .then((r) => r.json())
        .then((r) => {
          setData(r)
        });
    } catch (err) {
      console.log("Use Pokemón ERROR", err);
      // @ts-expect-error AAAAAAAAAAAAAAAAA
      serError(err?.message || err);
    }
    setIsLoading(false);
  }, [ apiUrl]);

  return { data, error, isLoading };
}
