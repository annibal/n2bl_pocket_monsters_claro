import { useSearchParams, NavLink } from "react-router";
import PokemonListItem from "@/components/PokemonListItem";
import usePokemons from "@/components/usePokemons";
import type { Pokemon } from "@/types/Pokemon";

export default function PokemonList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pokemons, meta } = usePokemons({
    page: (searchParams.get("page") || 0) as number | undefined,
    search: searchParams.get("search") || undefined,
    orderBy: searchParams.get("sort") || undefined,
    shape: searchParams.getAll("shape") || [],
    type: searchParams.getAll("type") || [],
  });

  const hasPrev = meta.page > 1
  const hasNext = meta.page < meta.totalPages

  function navPrev() {
    if (!hasPrev) return;
    setSearchParams((searchParams) => {
      searchParams.set("page", String(meta.page - 1));
      return searchParams;
    })
  }
  function navNext() {
    if (!hasNext) return;
    setSearchParams((searchParams) => {
      searchParams.set("page", String(meta.page + 1));
      return searchParams;
    })
  }

  return (
    <>
      <ul>
        {(pokemons || []).map((pkmn: Pokemon) => (
          <PokemonListItem key={String(pkmn.id)} pokemon={pkmn} />
        ))}
      </ul>
      <div id="pagination">
        <a onClick={navPrev} className={`pagination__button pagination__button--previous ${hasPrev ? "" : "disabled"}`}>
          🡰 Previous
        </a>

        <span className="pagination--text">
          <span className="desktop-only">Showing </span>
          {meta.limit * (meta.page - 1) + 1}-{meta.limit * meta.page}
          <span className="desktop-only"> of </span>
          <span className="mobile-only">/</span>
          {meta.total}
          <span className="desktop-only"> pokemons.</span>
        </span>

        <a onClick={navNext} className={`pagination__button pagination__button--next ${hasNext ? "" : "disabled"}`}>
          Next 🡲
        </a>
      </div>
    </>
  );
}
