import { PokemonRepository } from "@/repository/pokemon.repository";
import { Pokemon, PokemonDatabase } from "@/types/pokemon";

export class PokemonService {
  constructor(private repository = new PokemonRepository()) {}

  list(params: any) {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(50, Number(params.limit) || 20);

    const search = params.search?.trim() || undefined;

    const orderBy = ["id", "name"].includes(params.orderBy)
      ? params.orderBy
      : "id";

    const orderDir = params.orderDir === "desc" ? "desc" : "asc";

    const data = this.repository.findAll({
      page,
      limit,
      search,
      orderBy,
      orderDir
    }).map(pokemon => this.map(pokemon));

    const { total } = this.repository.count(search);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  getById(id: string) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      throw new Error("Invalid ID");
    }

    const pokemon = this.repository.findById(numericId);

    if (!pokemon) {
      throw new Error("Pokemon not found");
    }

    return this.map(pokemon);
  }

  map(pokemon: PokemonDatabase): Pokemon {
    return {
      id:                pokemon.id,
      height:            pokemon.height,
      weight:            pokemon.weight,
      baseExperience:    pokemon.base_experience,
      evolvesFrom:       pokemon.evolves_from_species_id,
      genderRate:        pokemon.gender_rate,
      captureRate:       pokemon.capture_rate,
      baseHappiness:     pokemon.base_happiness,
      isBaby:            pokemon.is_baby === 1 ? true : false,
      hatchCounter:      pokemon.hatch_counter,
      hasGenderDiff:     pokemon.has_gender_differences === 1 ? true : false,
      isFormsSwitchable: pokemon.forms_switchable === 1 ? true : false,
      isLegendary:       pokemon.is_legendary === 1 ? true : false,
      isMythical:        pokemon.is_mythical === 1 ? true : false,
      name:              pokemon.name,
      generation:        pokemon.generation,
      region:            pokemon.region,
      color:             pokemon.color,
      color_id:          pokemon.color_id,
      shape:             pokemon.shape,
      shape_description: pokemon.shape_description,
      type1:             pokemon.type1,
      type1_id:          pokemon.type1_id,
      type2:             pokemon.type2,
      type2_id:          pokemon.type2_id,
      egg_group1:        pokemon.egg_group1,
      egg_group1_id:     pokemon.egg_group1_id,
      egg_group2:        pokemon.egg_group2,
      egg_group2_id:     pokemon.egg_group2_id,
      hp:                pokemon.hp,
      attack:            pokemon.attack,
      defense:           pokemon.defense,
      special_attack:    pokemon.special_attack,
      special_defense:   pokemon.special_defense,
      speed:             pokemon.speed,
    }
  }
}
