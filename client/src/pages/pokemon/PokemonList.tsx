import type { MouseEvent } from "react"
import { useSearchParams } from "react-router";
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

  function navPrev(evt: MouseEvent<HTMLButtonElement>) {
    console.log('navPrev');
    evt.preventDefault();
    if (!hasPrev) return;
    setSearchParams((searchParams) => {
      const newPage = meta.page - 1
      console.log('newPage :>> ', newPage);
      searchParams.set("page", String(newPage));
      return searchParams;
    })
  }
  function navNext(evt: MouseEvent<HTMLButtonElement>) {
    console.log('navNext');
    evt.preventDefault();
    if (!hasNext) return;
    setSearchParams((searchParams) => {
      const newPage = meta.page + 1
      console.log('newPage :>> ', newPage);
      searchParams.set("page", String(newPage));
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
        <button onClick={navPrev} type="button" className={`pagination__button pagination__button--previous ${hasPrev ? "" : "disabled"}`}>
          🡰 Previous
        </button>

        <span className="pagination--text">
          <span className="desktop-only">Showing </span>
          {meta.limit * (meta.page - 1) + 1}-{meta.limit * meta.page}
          <span className="desktop-only"> of </span>
          <span className="mobile-only">/</span>
          {meta.total}
          <span className="desktop-only"> pokemons.</span>
        </span>

        <button onClick={navNext} type="button" className={`pagination__button pagination__button--next ${hasNext ? "" : "disabled"}`}>
          Next 🡲
        </button>
      </div>
    </>
  );
}
