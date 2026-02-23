import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import type { Pokemon } from "@/types/Pokemon";

export interface PokemonListItemProps {
  pokemon: Pokemon;
}

export default function PokemonListItem({ pokemon: pkmn }: PokemonListItemProps) {
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmn.id}.png`;
  const strId = "#" + String(pkmn.id).padStart(4,0)
  return (
    <li className="pkmn-li">
      <div className="pkmn-li__image-wrapper">
        <img src={imageSource} className="pkmn-li__image" />
      </div>
      <div className="pkmn-li__primary-col">
        <p className="pkmn-li__name">{pkmn.name}</p>
        <div className="pkmn-li__types">
          <PokemonTypeBadge type={pkmn.type1Id}>{pkmn.type1}</PokemonTypeBadge>
          {pkmn.type2Id && <PokemonTypeBadge type={pkmn.type2Id}>{pkmn.type2}</PokemonTypeBadge>}
        </div>
        {/* <p className="pkmn-li__desc">{pkmn.shapeDescription}</p> */}
      </div>
      <div className="pkmn-li__secondary-col">
        <p className="pkmn-li__number">{strId}</p>
      </div>
    </li>
  );
}
