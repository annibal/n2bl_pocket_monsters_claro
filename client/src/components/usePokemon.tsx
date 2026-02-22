import useEnv from "@/components/EnvContext";
import { useEffect, useState } from "react";

export default function usePokemon(id: number) {
  const { apiUrl } = useEnv();
  const [pokemon, setPokemon] = useState({});
  const [flavorTexts, setFlavorTexts] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/pokemon/${id}`)
      .then((r) => r.json())
      .then((r) => {
        setPokemon(r.pokemon);
        setFlavorTexts(r.flavorTexts);
      });
  }, [id]);

  return { pokemon, flavorTexts };
}
