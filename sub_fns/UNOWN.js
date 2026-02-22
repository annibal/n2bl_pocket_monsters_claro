// Check null cells in pokemon table

import Database from "better-sqlite3";
import path from "node:path";

const DB_PATH = path.resolve("server/pokemon.db");
const db = new Database(DB_PATH);

switch (process.argv[2]) {
  case "unique":
    const cols = db.prepare("PRAGMA table_info(pokemon)").all();

    const sql = cols
      .map(
        (c) => `
      SELECT
        '${c.name}'                 AS column_name,
        COUNT(DISTINCT "${c.name}") AS distinct_count
      FROM pokemon`
      )
      .join(" UNION ALL ");

    const results = db.prepare(sql).all();

    const maxBars = 40;

    const counts = results.map((r) => r.distinct_count);
    const min = Math.min(...counts);
    const max = Math.max(...counts);

    results.forEach((res, idx) => {
      const scn = (res.column_name + "\x1b[0m").padEnd(28, ".");
      const dc = String(res.distinct_count).padEnd(4, " ");

      // const normalized =
      //   max === min
      //     ? maxBars
      //     : Math.round(
      //         ((res.distinct_count - min) / (max - min)) * (maxBars - 1)
      //       ) + 1;
      const normalized = max === min
        ? maxBars
        : Math.round(
          (
            (Math.log(res.distinct_count) - Math.log(min))
            /
            (Math.log(max) - Math.log(min))
          ) * (maxBars - 1)
        ) + 1;

      let bar = "▓".repeat(normalized);
      bar = bar.padEnd(maxBars, "_");

      console.log(`${String(idx).padStart(2, "0")} - \x1b[32m${scn}: \x1b[33m${dc}\x1b[0m [${bar}]`);
    });

    process.exit(0);
    break;

  case "nulls":
    const allPokemon = db
      .prepare(
        `
      SELECT
        height                  IS NOT NULL as h,
        weight                  IS NOT NULL as w,
        base_experience         IS NOT NULL as be,
        evolves_from_species_id IS NOT NULL as evo,
        gender_rate             IS NOT NULL as gr,
        capture_rate            IS NOT NULL as cr,
        base_happiness          IS NOT NULL as bh,
        is_baby                 IS NOT NULL as bb,
        hatch_counter           IS NOT NULL as hc,
        has_gender_differences  IS NOT NULL as gd,
        forms_switchable        IS NOT NULL as fs,
        is_legendary            IS NOT NULL as l,
        is_mythical             IS NOT NULL as m,
        name                    IS NOT NULL as n,
        generation              IS NOT NULL as g,
        region                  IS NOT NULL as r,
        color_id                IS NOT NULL as c,
        shape                   IS NOT NULL as s,
        shape_description       IS NOT NULL as sd,
        egg_group1              IS NOT NULL as e1,
        egg_group1_id           IS NOT NULL as ei1,
        egg_group2              IS NOT NULL as e2,
        egg_group2_id           IS NOT NULL as ei2,
        type1                   IS NOT NULL as t1,
        type1_id                IS NOT NULL as ti1,
        type2                   IS NOT NULL as t2,
        type2_id                IS NOT NULL as ti2,
        hp                      IS NOT NULL as hp,
        attack                  IS NOT NULL as atk,
        defense                 IS NOT NULL as def,
        special_attack          IS NOT NULL as spatk,
        special_defense         IS NOT NULL as spdef,
        speed                   IS NOT NULL as spd
      FROM pokemon LIMIT 1025
    `
      )
      .all();

    console.table(allPokemon);

    process.exit(0);
    break;

  default:
    console.log(`
❌ Wrong usage

Please run:
┌────────────────────────────────┐
│ node sub_fns/UNOWN.js ARGUMENT │
└────────────────────────────────┘

Where "ARGUMENT" may be:
- nulls   Logs the entire pokemon
          as an ANSI table, showing
          0 for null values and 1
          for non-null cells.

- unique  Logs all the columns of
          the pokemon table, and
          the count of distinct
          values of that columns.

done.
`);

    process.exit(1);
    break;
}
