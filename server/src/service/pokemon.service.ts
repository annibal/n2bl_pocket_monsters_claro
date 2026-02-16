import { PokemonRepository } from "@/repository/pokemon.repository";

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
    });

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

    return pokemon;
  }
}
