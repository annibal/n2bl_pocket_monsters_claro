import getDB from "@/db/connection";
import type { Pokemon, PokemonDatabase } from "@/types/pokemon";

export interface FindAllOptions {
  search?: string;
  page: number;
  limit: number;
  orderBy?: "name" | "id";
  orderDir?: "asc" | "desc";
  shape?: string[];
  type?: string[];
}

export class PokemonRepository {
  private db = getDB();

  findAll(options: FindAllOptions) {
    const { search, page, limit, orderBy = "id", orderDir = "asc", shape, type } = options;
    const hasSearch = search?.length && search.length > 1;
    const hasShape = Array.isArray(shape) && shape.length > 0
    const hasType = Array.isArray(type) && type.length > 0

    const offset = (page - 1) * limit;

    const order = `ORDER BY ${orderBy} ${orderDir}`;
    const pagination = `LIMIT ? OFFSET ?`;
    let where = "WHERE 1 = 1"
    if (hasSearch) where += ` AND name LIKE ?`
    if (hasShape) where += ` AND shape IN (${shape.map(() => "?").join(",")})`
    if (hasType) where += ` AND ( type1 IN (${type.map(() => "?").join(",")})`
    if (hasType) where += ` OR type2 IN (${type.map(() => "?").join(",")}) )`

    const query = `
      SELECT *
      FROM pokemon
      ${where}
      ${order}
      ${pagination}
    `;
    console.log(query)

    const params = []
    if (hasSearch) params.push(`%${search}%`)
    if (hasShape) { shape.forEach(shapeItem => params.push(shapeItem)); }
    if (hasType) { type.forEach(typeItem => params.push(typeItem)); }
    if (hasType) { type.forEach(typeItem => params.push(typeItem)); }
    params.push(limit)
    params.push(offset)

    // const params = search
    //   ? [`%${search}%`, limit, offset]
    //   : [limit, offset];

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
