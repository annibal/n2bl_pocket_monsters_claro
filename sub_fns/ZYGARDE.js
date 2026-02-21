// ZYGARDE
// Zygarde is the guardian of the Pokémon world's ecosystem.
//
// This script ensures the database schema is correct.
//
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = path.resolve("server/pokemon.db");

/**
 * 
 * @param {Object} data - The database, wrapped
 * @param {Object[]} data.pokemons - Array of pokemon objects
 * @param {Object[]} data.versions - Array of version groups of the game
 * @param {Object[]} data.flavors - Array with the flavor text descriptions of the pokemons on each game
 * @param {number} data.pokemons[].id - Pokemon number in the national dex
 * @param {string} data.pokemons[].name - Pokemon's name, slugified
 * data.pokemons[].a_whole_lot_more_properties...
 * @param {number} data.versions[].id - Arbitrary unique number that identifies this game version
 * @param {string} data.versions[].name - The name of this game version group, like Red/Blue, Sword, X & Y.
 * @param {number} data.flavors[].pokemon_id - Which pokemon is described by this flavor text
 * @param {number} data.flavors[].version_id - Which game originated this flavor text
 * @param {string} data.flavors[].text - "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out."
 */
export function letsGoDatabase(data) {
  console.log(`[ZYGARDE]=> zygarde.`); // sorry.

  // nuke
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }
  const db = new Database(DB_PATH);

  try {
    db.pragma("foreign_keys = ON");

    // docs say this makes insert faster (?)
    // they're turned back on later.
    db.pragma("journal_mode = MEMORY");
    db.pragma("synchronous = OFF");
    
    console.log(`[ZYGARDE]=> creating tables.`);
    db.exec(`
      CREATE TABLE pokemon (
        id INTEGER PRIMARY KEY,
        height INTEGER,
        weight INTEGER,
        base_experience INTEGER,
        evolves_from_species_id INTEGER,

        gender_rate INTEGER,
        capture_rate INTEGER,
        base_happiness INTEGER,
        is_baby INTEGER,
        hatch_counter INTEGER,
        has_gender_differences INTEGER,
        forms_switchable INTEGER,
        is_legendary INTEGER,
        is_mythical INTEGER,

        name TEXT NOT NULL,
        generation TEXT,
        region TEXT,

        color TEXT,
        color_id TEXT,

        shape TEXT,
        shape_description TEXT,

        type1 TEXT,
        type1_id TEXT,
        type2 TEXT,
        type2_id TEXT,

        egg_group1 TEXT,
        egg_group1_id TEXT,
        egg_group2 TEXT,
        egg_group2_id TEXT,

        hp INTEGER,
        attack INTEGER,
        defense INTEGER,
        special_attack INTEGER,
        special_defense INTEGER,
        speed INTEGER
    );`);
    console.log(`[ZYGARDE]=> created POKEMON table.`);
    
    db.exec(`
      CREATE INDEX idx_pokemon_name ON pokemon(name);
      CREATE INDEX idx_pokemon_generation ON pokemon(generation);
      CREATE INDEX idx_pokemon_type1 ON pokemon(type1_id);
      CREATE INDEX idx_pokemon_type2 ON pokemon(type2_id);
      CREATE INDEX idx_pokemon_egg1 ON pokemon(egg_group1_id);
      CREATE INDEX idx_pokemon_egg2 ON pokemon(egg_group2_id);
    `);
    console.log(`[ZYGARDE]=> created INDEX on table POKEMON.`);

    db.exec(`
      CREATE TABLE version (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );`);
    console.log(`[ZYGARDE]=> created VERSION table.`);

    db.exec(`
      CREATE TABLE flavor_text (
        pokemon_id INTEGER,
        version_id INTEGER,
        text TEXT NOT NULL,
        PRIMARY KEY (pokemon_id, version_id),
        FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
        FOREIGN KEY (version_id) REFERENCES version(id)
    );`);
    console.log(`[ZYGARDE]=> created FLAVOR_TEXT table.`);

    db.exec(`
      CREATE INDEX idx_flavor_pokemon ON flavor_text(pokemon_id);
    `);
    console.log(`[ZYGARDE]=> created INDEX on table FLAVOR.`);
    
    //

    console.log(`[ZYGARDE]=> preparing insertion functions`);
    const insertPokemon = db.prepare(`
      INSERT INTO pokemon (
        id, height, weight, base_experience,
        evolves_from_species_id,
        gender_rate, capture_rate, base_happiness,
        is_baby, hatch_counter, has_gender_differences,
        forms_switchable, is_legendary, is_mythical,
        name, generation, region,
        color, color_id,
        shape, shape_description,
        type1, type1_id,
        type2, type2_id,
        egg_group1, egg_group1_id,
        egg_group2, egg_group2_id,
        hp, attack, defense,
        special_attack, special_defense, speed
      )
      VALUES (
        @id, @height, @weight, @base_experience,
        @evolves_from_species_id,
        @gender_rate, @capture_rate, @base_happiness,
        @is_baby, @hatch_counter, @has_gender_differences,
        @forms_switchable, @is_legendary, @is_mythical,
        @name, @generation, @region,
        @color, @color_id,
        @shape, @shape_description,
        @type1, @type1_id,
        @type2, @type2_id,
        @egg_group1, @egg_group1_id,
        @egg_group2, @egg_group2_id,
        @hp, @attack, @defense,
        @special_attack, @special_defense, @speed
      )
    `);
    console.log(`[ZYGARDE]=> prepared pokemon inserter`);

    const insertVersion = db.prepare(`
      INSERT INTO version (id, name)
      VALUES (@id, @name)
    `);

    const insertFlavor = db.prepare(`
      INSERT INTO flavor_text (pokemon_id, version_id, text)
      VALUES (@pokemon_id, @version_id, @text)
    `);
    console.log(`[ZYGARDE]=> prepared all inserters`);

    //
    
    const runTransaction = db.transaction(() => {
      console.log(`[ZYGARDE]=> began transaction.`);
      console.log(`[ZYGARDE]=> inserting pokemons.`);
      data.pokemons.forEach(pkmn => insertPokemon.run({
        ...pkmn,
        is_baby: pkmn.is_baby ? 1 : 0,
        has_gender_differences: pkmn.has_gender_differences ? 1 : 0,
        forms_switchable: pkmn.forms_switchable ? 1 : 0,
        is_legendary: pkmn.is_legendary ? 1 : 0,
        is_mythical: pkmn.is_mythical ? 1 : 0
      }));
      console.log(`[ZYGARDE]=> succesfully inserted all pokemons, now inserting versions.`);
      data.versions.forEach(v => insertVersion.run(v))
      console.log(`[ZYGARDE]=> succesfully inserted the versions, now inserting flavor text.`);
      data.flavors.forEach(f => insertFlavor.run(f))
      console.log(`[ZYGARDE]=> all flavor texts inserted.`)
    });

    runTransaction();
    console.log(`[ZYGARDE]=> finished transaction.`);
    console.log(`[ZYGARDE]=> final settings for database performance...`);

    db.pragma("journal_mode = WAL");
    db.pragma("synchronous = NORMAL");

    // this should improve select performance
    db.exec("ANALYZE;");

    console.log(`[ZYGARDE]=> database performance optimized.`);
    console.log(`[ZYGARDE]=> a simple test to check if data actually exists;`);

    const zygarde = db.prepare(`
      SELECT pokemon.id, pokemon.name, hp, attack, defense, special_attack, special_defense, speed, flavor_text.text AS flavor_text, version.name AS version
      FROM pokemon
      INNER JOIN flavor_text ON flavor_text.pokemon_id = pokemon.id
      INNER JOIN version ON version.id = flavor_text.version_id
      WHERE flavor_text.version_id = 26
      AND pokemon.id = 718
    `).all();
    console.log({ zygarde })

    if (zygarde[0].name.toLowerCase().startsWith("zygarde")) {
      console.log(`[ZYGARDE]=> I found myself, good.`)
    } else {
      throw new Error("Queried pokemon #718 does not match expected data.")
    }

    const count_pokemon = db.prepare(`SELECT COUNT(id) FROM pokemon as count_pokemon`).pluck().get();
    console.log({ count_pokemon })
    if (count_pokemon >= 1025) {
      console.log(`[ZYGARDE]=> 1025 pokemon on record.`)
    } else {
      throw new Error("There are fewer pokemons in record than expected")
    }

    console.log(`[ZYGARDE]=> All good.`);
  } catch (err) {
    console.log(`[ZYGARDE]=> ❌`);
    console.log(`[ZYGARDE]=> oh.`);
    console.log(`[ZYGARDE]=> something went wrong:\n`);
    console.log(err);
    console.log(`\n[ZYGARDE]=> that must be fixed immediately.`);
    console.log(`[ZYGARDE]=> cannot prepare database.`);
    console.log(`[ZYGARDE]=> execution aborted.`);
  } finally {
    db.close();
    console.log(`[ZYGARDE]=> closed connection to the database.`);
  }
}
