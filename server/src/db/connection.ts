import Database from "better-sqlite3";
import type { Database as BetterSqliteDatabase } from "better-sqlite3";

const db: BetterSqliteDatabase = new Database("pokedex.db");
export default function getDB(): BetterSqliteDatabase {
  return db;
}
