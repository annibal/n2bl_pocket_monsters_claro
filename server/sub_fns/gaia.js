import Database from "better-sqlite3";

const db = new Database("pokedex.db");

// db.pragma("foreign_keys = ON");

// db.exec(`
// CREATE TABLE IF NOT EXISTS generation (
//   id INTEGER PRIMARY KEY,
//   name TEXT NOT NULL
// );
// `);

const sourceURL = "https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/data/v2/csv/";
const csvs = [
  // 1st the pokemon list
  "pokemon", // id	identifier	species_id	height	weight	base_experience	order	is_default

  // 2nd the species, spinal tree of this data
  "pokemon_species", // id	identifier	generation_id	evolves_from_species_id	evolution_chain_id	color_id	shape_id	habitat_id	gender_rate	capture_rate	base_happiness	is_baby	hatch_counter	has_gender_differences	growth_rate_id	forms_switchable	is_legendary	is_mythical	order	conquest_order
  "pokemon_species_names", // pokemon_species_id	local_language_id	name	genus
  "pokemon_species_prose", // pokemon_species_id	local_language_id	form_description
  "pokemon_species_flavor_text", // species_id	version_id	language_id	flavor_text

  // Species' dex number
  "pokedexes", // id	region_id	identifier	is_main_series
  "pokedex_prose", // pokedex_id	local_language_id	name	description
  "pokemon_dex_numbers", // species_id	pokedex_id	pokedex_number

  // Pokemon type
  "types", // id	identifier	generation_id	damage_class_id
  "type_names", // type_id	local_language_id	name
  "pokemon_types", // pokemon_id	type_id	slot
  "type_efficacy", // damage_type_id	target_type_id	damage_factor

  // Pokemon Ability
  "abilities", // id	identifier	generation_id	is_main_series
  "ability_flavor_text", // ability_id	version_group_id	language_id	flavor_text
  "ability_names", // ability_id	local_language_id	name
  "ability_prose", // ability_id	local_language_id	short_effect
  "pokemon_abilities", // pokemon_id	ability_id	is_hidden	slot

  // Pokemon Stats
  "stats", // id	damage_class_id	identifier	is_battle_only	game_index
  "stat_names", // stat_id	local_language_id	name
  "pokemon_stats", // pokemon_id	stat_id	base_stat	effort

  // Species' Egg Group
  "egg_groups", // id	identifier
  "egg_group_prose", // egg_group_id	local_language_id	name
  "pokemon_egg_groups", // species_id	egg_group_id

  // hidrates data from Species
  "pokemon_colors", // id	identifier
  "pokemon_color_names", // pokemon_color_id	local_language_id	name

  // hidrates data from Species
  "evolution_chains", // id	baby_trigger_item_id
  "evolution_triggers", // id	identifier
  "evolution_trigger_prose", // evolution_trigger_id	local_language_id	name
  "pokemon_evolution", // id	evolved_species_id	evolution_trigger_id	trigger_item_id	minimum_level	gender_id	location_id	held_item_id	time_of_day	known_move_id	known_move_type_id	minimum_happiness	minimum_beauty	minimum_affection	relative_physical_stats	party_species_id	party_type_id	trade_species_id	needs_overworld_rain	turn_upside_down	needs_multiplayer	region_id	base_form_id	used_move_id	minimum_move_count	minimum_steps	minimum_damage_taken

  // hidrates data from Species
  "pokemon_shapes", // id	identifier
  "pokemon_shape_prose", // pokemon_shape_id	local_language_id	name	awesome_name	description

  // hidrates data from Species
  "pokemon_habitats", // id	identifier
  "pokemon_habitat_names", // pokemon_habitat_id	local_language_id	name

  // hidrates data from Species
  "genders", // id	identifier

  // hidrates data from Species
  "generations", // id	main_region_id	identifier
  "generation_names", // generation_id	local_language_id	name

  // hidrates data from Species
  "growth_rates", // id	identifier	formula
  "growth_rate_prose", // growth_rate_id	local_language_id	name
  "experience", // growth_rate_id	level	experience

  // hidrates data from Species
  "versions", // id	version_group_id	identifier
  "version_groups", // id	identifier	generation_id	order
  "version_names", // version_id	local_language_id	name
  "version_group_regions", // version_group_id	region_id

  // Extra logic for pokemon details
  "pokemon_forms", // id	identifier	form_identifier	pokemon_id	introduced_in_version_group_id	is_default	is_battle_only	is_mega	form_order	order
  "pokemon_form_types", // pokemon_form_id	type_id	slot
  "pokemon_form_names", // pokemon_form_id	local_language_id	form_name	pokemon_name
  "pokemon_form_generations", // pokemon_form_id	generation_id	game_index

  // hidrates data from Pokexes
  "regions", // id	identifier
  "region_names", // region_id	local_language_id	name

  "pokedex_version_groups", // pokedex_id	version_group_id

  "natures", // id	identifier	decreased_stat_id	increased_stat_id	hates_flavor_id	likes_flavor_id	game_index
  "nature_names", // nature_id	local_language_id	name

  "moves", // id	identifier	generation_id	type_id	power	pp	accuracy	priority	target_id	damage_class_id	effect_id	effect_chance	contest_type_id	contest_effect_id	super_contest_effect_id
  "move_names", // move_id	local_language_id	name
  "move_flavor_text", // move_id,version_group_id,language_id,flavor_text
  "move_targets", // id	identifier
  "move_target_prose", // move_target_id	local_language_id	name	description
  "move_meta", // move_id	meta_category_id	meta_ailment_id	min_hits	max_hits	min_turns	max_turns	drain	healing	crit_rate	ailment_chance	flinch_chance	stat_chance
  "move_flags", // id	identifier
  "move_flag_prose", // move_flag_id	local_language_id	name	description
  "move_flag_map", // move_id	move_flag_id
  "move_battle_styles", // id	identifier
  "move_battle_style_prose", // move_battle_style_id	local_language_id	name
  "move_damage_classes", // id	identifier
  "move_damage_class_prose", // move_damage_class_id	local_language_id	name	description
  "move_meta_categories", // id	identifier
  "move_meta_category_prose", // move_meta_category_id	local_language_id	description
  "move_meta_ailments", // id	identifier
  "move_meta_ailment_names", // move_meta_ailment_id	local_language_id	name
];

function inferValue(keyName, rawValue) {
  if (keyName?.startsWith("is_")) {
    return !(rawValue === "0" || rawValue === 0 || rawValue == null);
  }
  const numVal = Number(rawValue);
  if (!isNaN(numVal)) {
    return numVal;
  }

  if (rawValue === null || rawValue === undefined) {
    return null;
  }
  if (typeof rawValue === "string") {
    const lcv = rawValue.toLowerCase();
    if (lcv === "false") {
      return false;
    }
    if (lcv === "true") {
      return true;
    }
    if (lcv === "null") {
      return null;
    }
  }

  return rawValue;
}

function getPrettyPrintHeaders(headers, maxLen=64, indent=8, initialLen=0) {
  let lineLen = initialLen;
  let printStr = ""
  headers.forEach((header, i) => {
    printStr += header;
    lineLen += header.length;
    if (i < headers.length-1) {
      printStr += ", ";
      lineLen += 2;
    }
    let nextHeader = headers[i+1]
    if (!nextHeader) nextHeader = ""
    const nextHeaderLen = nextHeader.length;
    if (lineLen + nextHeaderLen >= maxLen) {
      printStr += "\n";
      printStr += " ".repeat(indent);
      lineLen = 0;
    }
  })
  return printStr
}


async function getAllPkmnData() {
  try {
    const allCSVsData = await Promise.all(
      csvs.map((csvName) =>
        fetch(sourceURL + csvName + ".csv")
          .then((r) => r.text())
          .then((r) => {
            const rows = r.trim().split("\n");
            const headers = rows.shift().split(",");
            
            if (rows.length < 1) {
              throw new RangeError(`[GAIA]=> Error: got 0 rows for ${csvName}. All csvs must have data.`)
            }
            const displayName = `${csvName}.csv: `.padEnd(34, "_");
            const headerLen = String(headers.length).padStart(2, "0");
            const rowsLen = String(rows.length).padStart(6, " ");
            console.log(`[GAIA]=> Got ${displayName} ${headerLen} cols, ${rowsLen} rows.`);
            // console.log("")
            const displayHeaders = getPrettyPrintHeaders(headers, 60, 0, 10);
            console.log(`         Features:`)
            console.log(`         ${displayHeaders}`)
            console.log("")

            const data = rows.map((row) =>
              row.split(",").reduce((acc, curr, idx) => {
                const keyName = headers[idx];
                return {
                  ...acc,
                  [keyName]: inferValue(keyName, curr),
                };
              }, {})
            );
            const dataObj = { id: csvName, data };
            return dataObj;
          })
          .catch((err) => {
            console.log(`[GAIA]=> Failed to fetch ${csvName}.csv.`, err);
          })
      )
    );

    const mappedData = allCSVsData.reduce(
      (all, curr) => ({
        ...all,
        [curr.id]: curr.data,
      }),
      {}
    );

    return mappedData;
  } catch (err) {
    console.log(`[GAIA]=> Could not react some of the base data csv files, aborting database creation.`);
  }
}

function selectKeys(...keys) {
  return function keySelector(item, _index, _ogArray) {
    let predicate = {};
    keys.forEach((key) => (predicate[key] = item[key]));
    return predicate;
  };
}

async function main() {
  console.log(`[GAIA]=> There are ${csvs.length} csv files to download and parse.`);
  console.log(`[GAIA]=> Begin fetching CSV data now...`);
  const allPokemonData = await getAllPkmnData();

  const theClassics = [allPokemonData.pokemon[0], allPokemonData.pokemon[3], allPokemonData.pokemon[6]]
    .map(selectKeys("identifier", "height", "weight", "base_experience", "species_id"))
    .map((pkmn) => {
      pkmn.specie = selectKeys(
        "generation_id",
        "evolves_from_species_id",
        "color_id",
        "shape_id",
        "habitat_id",
        "gender_rate",
        "base_happiness",
        "hatch_counter"
      )(allPokemonData.pokemon_species.find((specie) => specie.id === pkmn.species_id));
      delete pkmn.species_id;
      return pkmn;
    });
  console.log(theClassics);
  const uniquePokemon = allPokemonData.pokemon.filter((pokemon) => pokemon.is_default);
  console.log(`[GAIA]=> There are ${uniquePokemon.length} unique pokemons!`);
  
  
  
  console.log(`[GAIA]=> All done!\n\n\n`);
}
main();
