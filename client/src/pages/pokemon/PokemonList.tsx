import { useSearchParams, NavLink } from "react-router";
import PokemonListItem from "@/components/PokemonListItem";
import usePokemons from "@/components/usePokemons";
import type { Pokemon } from "@/types/Pokemon";

export default function PokemonList() {
  const [searchParams] = useSearchParams();
  const { pokemons, meta } = usePokemons({
    page: (searchParams.get("page") || 0) as number | undefined
  });

  const hasPrev = meta.page > 1
  const hasNext = meta.page < meta.totalPages

  return (
    <>
      <ul>
        {(pokemons || []).map((pkmn: Pokemon) => (
          <PokemonListItem key={String(pkmn.id)} pokemon={pkmn} />
        ))}
      </ul>
      <div id="pagination">
        <NavLink to={hasPrev ? `?page=${meta.page - 1}` : ""} className={`pagination__button pagination__button--previous ${hasPrev ? "" : "disabled"}`}>
          🡰 Previous
        </NavLink>

        <span className="pagination--text">
          <span className="desktop-only">Showing </span>
          {meta.limit * (meta.page - 1) + 1}-{meta.limit * meta.page}
          <span className="desktop-only"> of </span>
          <span className="mobile-only">/</span>
          {meta.total}
          <span className="desktop-only"> pokemons.</span>
        </span>

        <NavLink to={hasNext ? `?page=${meta.page + 1}` : ""} className={`pagination__button pagination__button--next ${hasNext ? "" : "disabled"}`}>
          Next 🡲
        </NavLink>
      </div>
    </>
  );
}
