import getDB from "@/db/connection";
import type { Pokemon, PokemonDatabase } from "@/types/pokemon";

export interface FindAllOptions {
  search?: string;
  page: number;
  limit: number;
  orderBy?: "name" | "id";
  orderDir?: "asc" | "desc";
}

export class PokemonRepository {
  private db = getDB();

  findAll(options: FindAllOptions) {
    const { search, page, limit, orderBy = "id", orderDir = "asc" } = options;

    const offset = (page - 1) * limit;

    const where = search ? `WHERE name LIKE ?` : "";
    const order = `ORDER BY ${orderBy} ${orderDir}`;
    const pagination = `LIMIT ? OFFSET ?`;

    const query = `
      SELECT *
      FROM pokemon
      ${where}
      ${order}
      ${pagination}
    `;

    const params = search
      ? [`%${search}%`, limit, offset]
      : [limit, offset];

    return this.db.prepare(query).all(...params) as PokemonDatabase[];
  }

  findById(id: number) {
    return this.db
      .prepare(`SELECT * FROM pokemon WHERE id = ?`)
      .get(id) as PokemonDatabase | undefined;
  }

  count(search?: string) {
    if (search) {
      return this.db
        .prepare(`SELECT COUNT(*) as total FROM pokemon WHERE name LIKE ?`)
        .get(`%${search}%`) as { total: number };
    }

    return this.db
      .prepare(`SELECT COUNT(*) as total FROM pokemon`)
      .get() as { total: number };
  }

  getUniques(column: string) {
    return this.db.prepare(
      `SELECT DISTINCT ${column} AS distinct_values FROM pokemon`
    ).all();
  }
}
