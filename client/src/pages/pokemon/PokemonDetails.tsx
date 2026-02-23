import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import usePokemon from "@/components/usePokemon";
import { useParams } from "react-router";

export default function PokemonDetails() {
  const { id } = useParams();
  const strId = "#" + String(id).padStart(4, "0");
  const { pokemon: pkmn, flavorTexts: fvtxt } = usePokemon(Number(id));

  if (!pkmn) {
    return (
      <div className="pkmn-details pkmn-not-found">
        <h1>Not Found</h1>
        <p>Pokemon {strId} does not exist</p>
      </div>
    );
  }

  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmn.id}.png`;

  return (
    <div className="pkmn-details">
      <header className="pkmn-det__header">
        <figure className="pkmn-det__figure">
          <img className="pkmn-det__image" src={imageSource} />
        </figure>

        <h1 className="pkmn-det__name">{pkmn.name}</h1>
        <h2 className="pkmn-det__number">{strId}</h2>

        <div className="pkmn-li__types">
          <PokemonTypeBadge type={pkmn.type1Id}>{pkmn.type1}</PokemonTypeBadge>
          {pkmn.type2Id && <PokemonTypeBadge type={pkmn.type2Id}>{pkmn.type2}</PokemonTypeBadge>}
        </div>
      </header>

      <div className="pkmn-det__body">
        <div className="row">
          <InfoBlock label="height" value={pkmn.height} />
          <InfoBlock label="weight" value={pkmn.weight} />
          <InfoBlock label="region" value={pkmn.region} />
        </div>
        <div className="row">
          <InfoBlock label="hp" value={pkmn.hp} />
          <InfoBlock label="attack" value={pkmn.attack} />
          <InfoBlock label="defense" value={pkmn.defense} />
        </div>
        <div className="row">
          <InfoBlock label="speed" value={pkmn.speed} />
          <InfoBlock label="Sp. Attack" value={pkmn.specialAttack} />
          <InfoBlock label="Sp. Defense" value={pkmn.specialDefense} />
        </div>

        <div className="pkmn-det__shape">
          <h4 className="pkmn-det__shape-name">Shape: {pkmn.shape}</h4>
          <p className="pkmn-det__shape-desc">{pkmn.shapeDescription}</p>
        </div>

        <hr />

        <div className="pkmn-det__flavor-texts">
          <p className="pkmn-det__flavor-texts-heading">Flavor Texts</p>
          {(fvtxt || []).map((flvr) => {
            return (
              <div className="flavor-text__row" key={flvr.version_id + "-" + id}>
                <div className="flavor-text__version">{flvr.version}</div>
                <div className="flavor-text__text">{(flvr.text || "").replaceAll("\f", " ")}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

//  "id": 791,
//  "height": 34,
//  "weight": 2300,
// "baseExperience": 306,
// "evolvesFrom": 790,
// "genderRate": -1,
// "captureRate": 45,
// "baseHappiness": 0,
// "isBaby": false,
// "hatchCounter": 120,
// "hasGenderDiff": false,
// "isFormsSwitchable": false,
//  "isLegendary": true,
//  "isMythical": false,
//  "name": "Solgaleo",
// "generation": "Generation VII",
//  "region": "Alola",
// "color": "White",
// "colorId": "white",
// "shape": "Quadruped",
// "shapeDescription": "PokÃ©mon with a quadruped body",
// "type1": "Psychic",
// "type1Id": "psychic",
// "type2": "Steel",
// "type2Id": "steel",
// "eggGroup1": "Undiscovered",
// "eggGroup1Id": "no-eggs",
// "eggGroup2": null,
// "eggGroup2Id": null,
// "hp": 137,
// "attack": 137,
// "defense": 107,
// "specialAttack": 113,
// "specialDefense": 89,
// "speed": 97

function InfoBlock({ label, value }: { label: string; value: string | number | null | boolean }) {
  let strValue = value;
  if (typeof value === "boolean") {
    strValue = value ? "✅ Yes" : "❌ No";
  }
  if (value == null) {
    strValue = "n/a";
  }
  return (
    <div className="col">
      <p className="prop-title">{label}</p>
      <p className="prop-value">{strValue}</p>
    </div>
  );
}
