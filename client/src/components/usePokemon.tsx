/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import useEnv from "@/components/EnvContext";
import type { FlavorText } from "@/types/FlavorText";
import type { Pokemon } from "@/types/Pokemon";

export interface UsePokemonReturn {
  pokemon: Pokemon | null;
  flavorTexts: FlavorText[] | null
  isLoading: boolean;
  error: string | null;
}

export default function usePokemon(id: number):UsePokemonReturn {
  const { apiUrl } = useEnv();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flavorTexts, setFlavorTexts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    setPokemon(null);
    setFlavorTexts([]);

    try {
      fetch(`${apiUrl}/pokemon/${id}`)
        .then((r) => r.json())
        .then((r) => {
          if (r.pokemon) {
            setPokemon(r.pokemon);
          } else {
            throw new Error("Unexpected return structure - cannot find pokemon property");
          }
          if (r.flavorTexts) {
            setFlavorTexts(r.flavorTexts);
          } else {
            throw new Error("Unexpected return structure - cannot find flavorTexts property");
          }
        });
    } catch (err) {
      console.log("Use Pokemón ERROR", err);
      // @ts-expect-error AAAAAAAAAAAAAAAAA
      serError(err?.message || err);
    }
    setIsLoading(false);
  }, [id, apiUrl]);

  return { pokemon, flavorTexts, error, isLoading };
}
