import PokemonListItem from "@/components/PokemonListItem";
import usePokemons from "@/components/usePokemons";
import type { Pokemon } from "@/types/Pokemon";

export default function PokemonList() {
  const { pokemons } = usePokemons({});

  return (
    <ul>
      {(pokemons || []).map((pkmn: Pokemon) => (
        <PokemonListItem key={String(pkmn.id)} pokemon={pkmn} />
      ))}
    </ul>
  );
}
