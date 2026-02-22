// Run a query and log the results

import Database from "better-sqlite3";
import path from "node:path";

const DB_PATH = path.resolve("server/pokemon.db");
const db = new Database(DB_PATH);

let query = process.argv.slice(2).join(" ")
console.log(query)

const result = db.prepare(query).all()
console.table(result)
