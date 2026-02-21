// Check null cells in pokemon table

import Database from "better-sqlite3";
import path from "node:path";

const DB_PATH = path.resolve("server/pokemon.db");
const db = new Database(DB_PATH);

const allPokemon = db.prepare(`
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
`).all()

console.table(allPokemon)
