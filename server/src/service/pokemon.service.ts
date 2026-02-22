import { FlavorTextRepository } from "@/repository/flavor_text.repository";
import { FindAllOptions, PokemonRepository } from "@/repository/pokemon.repository";
import { Pokemon, PokemonDatabase, toPokemonId } from "@/types/pokemon";

export class PokemonService {
  constructor(
    private repository = new PokemonRepository(),
    private flavorTextRepository = new FlavorTextRepository()
  ) {}

  list(params: FindAllOptions) {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(50, Number(params.limit) || 20);

    const search = params.search?.trim() || undefined;

    const orderBy = ["id", "name"].includes(params.orderBy!) ? (params.orderBy as "id" | "name") : "id";

    const orderDir = params.orderDir === "desc" ? "desc" : "asc";

    const data = this.repository
      .findAll({
        page,
        limit,
        search: search || "",
        orderBy,
        orderDir,
      })
      .map((pokemon) => this.map(pokemon));

    const { total } = this.repository.count(search);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  getById(id: string) {
    const pokemonId = toPokemonId(id);
    if (!isFinite(pokemonId)) {
      throw new Error("Invalid ID");
    }

    const pokemon = this.repository.findById(pokemonId);
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }

    const parsedPokemon = this.map(pokemon);
    const flavorTexts = this.flavorTextRepository.getPokemonFlavors(pokemonId);

    return { pokemon: parsedPokemon, flavorTexts };
  }

  map(pokemon: PokemonDatabase): Pokemon {
    return {
      id: pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      baseExperience: pokemon.base_experience,
      evolvesFrom: pokemon.evolves_from_species_id,
      genderRate: pokemon.gender_rate,
      captureRate: pokemon.capture_rate,
      baseHappiness: pokemon.base_happiness,
      isBaby: pokemon.is_baby === 1 ? true : false,
      hatchCounter: pokemon.hatch_counter,
      hasGenderDiff: pokemon.has_gender_differences === 1 ? true : false,
      isFormsSwitchable: pokemon.forms_switchable === 1 ? true : false,
      isLegendary: pokemon.is_legendary === 1 ? true : false,
      isMythical: pokemon.is_mythical === 1 ? true : false,
      name: pokemon.name,
      generation: pokemon.generation,
      region: pokemon.region,
      color: pokemon.color,
      color_id: pokemon.color_id,
      shape: pokemon.shape,
      shape_description: pokemon.shape_description,
      type1: pokemon.type1,
      type1_id: pokemon.type1_id,
      type2: pokemon.type2,
      type2_id: pokemon.type2_id,
      egg_group1: pokemon.egg_group1,
      egg_group1_id: pokemon.egg_group1_id,
      egg_group2: pokemon.egg_group2,
      egg_group2_id: pokemon.egg_group2_id,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      special_attack: pokemon.special_attack,
      special_defense: pokemon.special_defense,
      speed: pokemon.speed,
    };
  }

  listFilters() {
    return [
      "gender_rate",
      "base_happiness",
      "is_baby",
      "has_gender_differences",
      "generation",
      "is_legendary",
      "is_mythical",
      "region",
      "color",
      "shape",
      "type1",
      "egg_group1",
    ].reduce(
      (acc, col) => ({
        ...acc,
        [col]: (this.repository
          .getUniques(col) as Array<{ distinct_values: number | string }>)
          .map((res) => res.distinct_values)
          .sort(),
      }),
      {}
    );
  }
}
