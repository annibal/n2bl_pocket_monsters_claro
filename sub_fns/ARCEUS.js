// ARCEUS
// the Pokémon that shaped the universe with its 1,000 arms.
//
// This script fetches data from PokeAPI's github and seeds the database.
//


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

  "languages", // id	iso639	iso3166	identifier	official	order
  "language_names", // language_id	local_language_id	name

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

function without(obj, _keys) {
  let keys = _keys;
  if (typeof _keys === "string") { keys = _keys.split(",").map(k => k.trim()); }
  // TODO: pass obj with { key: true (keep), otherKey: false (discard) }
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (keys.includes(key)) { return acc; }
    return { ...acc, [key]: val };
  }, {})
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } 
    else if (char === ',' && !inQuotes) {
      row.push(field);
      field = "";
    } 
    else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } 
    else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}



async function getAllPkmnData() {
  let gottenCsvs = 0;
  try {
    const csvLen = csvs.length;
    const allCSVsData = await Promise.all(
      csvs.map((csvName) =>
        fetch(sourceURL + csvName + ".csv")
          .then((r) => r.text())
          .then((r) => {
            const rows = parseCSV(r);
            const headers = rows.shift();
            
            if (rows.length < 1) {
              throw new RangeError(`[ARCEUS]=> Error: got 0 rows for ${csvName}. All csvs must have data.`)
            }
            const displayName = `${csvName}.csv: `.padEnd(34, "_");
            const headerLen = String(headers.length).padStart(2, "0");
            const rowsLen = String(rows.length).padStart(6, " ");

            gottenCsvs += 1
            const pgRatio = gottenCsvs/csvLen
            const currStr = String(gottenCsvs).padStart(2,0);
            const overlayedCsvProgress = ansiProgressSlice(`ARCEUS - ${currStr}/${csvLen}`, pgRatio, 4)
            console.log(`[${overlayedCsvProgress}]=> Got ${displayName} ${headerLen} cols, ${rowsLen} rows.`);
            // console.log("")
            // const displayHeaders = getPrettyPrintHeaders(headers, 60, 0, 10);
            // console.log(`         Features:`)
            // console.log(`         ${displayHeaders}`)
            // console.log("")
            
            const data = rows.map(cols =>
              cols.reduce((acc, curr, idx) => {
                const keyName = headers[idx];
                acc[keyName] = inferValue(keyName, curr);
                return acc;
              }, {})
            );
            
            const dataObj = { id: csvName, data };
            return dataObj;
          })
          .catch((err) => {
            console.log(`[ARCEUS]=> Failed to fetch ${csvName}.csv.`, err);
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
    console.log(`[ARCEUS]=> Could not react some of the base data csv files, aborting database creation.`);
  }
}

function selectKeys(...keys) {
  return function keySelector(item, _index, _ogArray) {
    let predicate = {};
    keys.forEach((key) => (predicate[key] = item[key]));
    return predicate;
  };
}

function ansiProgressSlice(str, ratio, color) {
  const YES = `\x1b[4${color}m\x1b[97m`;
  const RESET = "\x1b[0m";

  const graphemes = [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(str)].map(s => s.segment);

  const count = Math.round(graphemes.length * ratio);

  if (count <= 0) return str;
  if (count >= graphemes.length) {
    return YES + str + RESET;
  }
  return [
    YES,
    graphemes.slice(0, count).join(""),
    RESET,
    graphemes.slice(count).join(""),
  ].join("")
}


async function main() {
  console.log(`[ARCEUS]=> There are ${csvs.length} csv files to download and parse.`);
  console.log(`[ARCEUS - 00/${csvs.length}]=> Begin fetching CSV data now...`);
  const allPokemonData = await getAllPkmnData();

  const uniquePokemon = allPokemonData.pokemon.filter((pokemon) => pokemon.is_default);
  console.log(`[ARCEUS]=> There are ${uniquePokemon.length} unique pokemons!`);
  
  const mapPokemonData = Object.entries(allPokemonData)
    .filter( ([entityName, valArr]) => {
      if (!valArr || !Array.isArray(valArr) || valArr.length < 1) { return false; }
      const dataKeys = Object.keys(valArr[0]);
      return dataKeys.includes("id");
    })
    .reduce( (acc, [entityName, valArr]) => ({
      ...acc,
      [entityName]: valArr.reduce((acc2, valItem) => {
        const ovk = {};
        Object.entries(valItem).filter( ([col,val]) => col !== "id").forEach( ([col,val]) => {
          ovk[col] = val;
        });
        return { ...acc2, [valItem.id]: ovk }
      }, {})
        
        
        // .reduce((acc2,key) => ({
        //   ...acc2,
        //   [key]: curr[1][key]
        // }),{})
    }), {})
  ;

  const mapLangs = allPokemonData.languages.reduce((acc, curr) => {
    const langName = allPokemonData.language_names
        .find(langName => langName.local_language_id === 9 && langName.language_id === curr.id)
    return {
      ...acc,
      // [curr.identifier]: { id: langName.language_id, name: langName.name },
      [curr.identifier]: langName.language_id,
      // [langName.language_id]: { iso: curr.identifier, name: langName.name },
      [langName.language_id]: curr.identifier,
    }
  }, {});
  console.log(`[ARCEUS]=> Data partially available in ${Object.keys(mapLangs).length/2} languages.`);

  const pokemons = allPokemonData.pokemon.slice().filter(pkmn => pkmn.is_default).slice().map((pkmn, pkmnIdx) => {
    const _species = mapPokemonData.pokemon_species[pkmn.species_id];
    if (!_species) {
      throw new Error(`Species not found for #${pkmn.id} ${pkmn.identifier}. species_id=${pkmn.species_id}`);
    }
    const species = without(_species, "id,identifier,order,conquest_order");
    const species_name = allPokemonData.pokemon_species_names
      .filter(ln => ln.pokemon_species_id == pkmn.species_id)
      .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
    ;

    
    // pkmn.flavor_text.heartgold.version
    // pkmn.flavor_text.heartgold.version.pt-BR
    // pkmn.flavor_text.heartgold.text.pt-BR
    const flavor_universe = allPokemonData.pokemon_species_flavor_text.filter(x => x.species_id == pkmn.species_id);
    const flaversions = flavor_universe.map(x => x.version_id);
    const unique_versions = Array.from(new Set(flaversions));
    const flavor_text = unique_versions.reduce((accv, cvid) => {
      const cvstr = mapPokemonData.versions[cvid].identifier;
      return {
        ...accv,
        [cvstr]: {
          version_name: allPokemonData.version_names
            .filter(lnvn => lnvn.version_id == cvid)
            .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
            .en
          ,
          text: flavor_universe
            .filter(flv => flv.version_id === cvid)
            .reduce((a,c) => ({ ...a, [mapLangs[c.language_id]]: c.flavor_text }), {})
            .en
        }
      }
    }, {})


    // hp: { base: 123, names: {...}
    const spread_types = allPokemonData.stats.reduce((acc,curr) => {
      const stat_names = allPokemonData.stat_names
        .filter(ln => ln.stat_id == curr.id)
        .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
      const objStat = allPokemonData.pokemon_stats.find(stt => stt.stat_id === curr.id && stt.pokemon_id === pkmn.id)
      if (!objStat) { return acc; }
      return {
        ...acc,
        [curr.identifier]: objStat.base_stat
        // [curr.identifier]: {
        //   base: objStat.base_stat,
        //   effort: objStat.effort,
        //   names: stat_names
        // }
      }
    },{})

    const gen = mapPokemonData.generations[species.generation_id];
    const generation_name = allPokemonData.generation_names
      .filter(ln => ln.generation_id == species.generation_id)
      .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
    ;
    
    const region = mapPokemonData.regions[gen.main_region_id];
    const region_name = allPokemonData.region_names
      .filter(ln => ln.region_id == gen.main_region_id)
      .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
    ;
    
    const color_id = mapPokemonData.pokemon_colors[species.color_id].identifier;
    const color_name = allPokemonData.pokemon_color_names
      .filter(ln => ln.pokemon_color_id == species.color_id)
      .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
    ;
    
    const shape_id = mapPokemonData.pokemon_shapes[species.shape_id].identifier;
    const [shape_name, shape_awesome_name, shape_description] = allPokemonData.pokemon_shape_prose
      .filter(ln => ln.pokemon_shape_id == species.shape_id)
      .reduce((a,c) => [
        { ...a[0], [mapLangs[c.local_language_id]]: c.name },
        { ...a[0], [mapLangs[c.local_language_id]]: c.awesome_name },
        { ...a[0], [mapLangs[c.local_language_id]]: c.description },
      ], [{},{},{}])
    
    const habitat_name = allPokemonData.pokemon_habitat_names
      .filter(ln => ln.pokemon_habitat_id == species.habitat_id)
      .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
    ;
    const growth_rate_name = allPokemonData.growth_rate_prose
      .filter(ln => ln.growth_rate_id == species.growth_rate_id)
      .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
    ;
    const types = allPokemonData.pokemon_types
      .filter(x => x.pokemon_id === pkmn.id)
      .sort((a,b) => a.slot - b.slot)
      .map(x => {
        const type_idf = mapPokemonData.types[x.type_id].identifier;
        const names = allPokemonData.type_names
          .filter(ln => ln.type_id == x.type_id)
          .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {});
        return { type: type_idf, names }
      })
    ;
    const egg_groups = allPokemonData.pokemon_egg_groups
      .filter(x => x.species_id === pkmn.species_id)
      .map(x => {
        const egg_group_idf = mapPokemonData.egg_groups[x.egg_group_id].identifier;
        const names = allPokemonData.egg_group_prose
          .filter(ln => ln.egg_group_id == x.egg_group_id)
          .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {});
        return { egg_group: egg_group_idf, names }
      })
    ;
    
    
    let r = {
      ...without(pkmn, "species_id"),
      ...without(species, "generation_id,color_id,shape_id,habitat_id,growth_rate_id"),
      name: species_name.en,
      flavor_text_red_blue: flavor_text.red?.text,
      flavor_text_gold_silver: flavor_text.gold?.text,
      flavor_text_ruby_sapphire: flavor_text.ruby?.text,
      flavor_text_firered_leafgreen: flavor_text.firered?.text,
      flavor_text_heartgold_soulsilver: flavor_text.soulsilver?.text || flavor_text.heartgold?.text,
      flavor_text_black_white: flavor_text.black?.text,
      flavor_text_x_y: flavor_text.x?.text,
      flavor_text_omegaruby_alphasapphire: flavor_text["omega-ruby"]?.text,
      flavor_text_lets_go: flavor_text["lets-go-pikachu"]?.text,
      flavor_text_sword: flavor_text.sword?.text,
      flavor_text_shield: flavor_text.shield?.text,
      generation: generation_name.en,
      region: region_name.en,
      color: color_name.en,
      color_id,
      shape: shape_name.en,
      shape_description: shape_description.en,
      // shape_awesome_name,
      habitat: habitat_name.en,
      type1: types[0].names?.en,
      type1_id: types[0].type,
      type2: types[1]?.names?.en,
      type2_id: types[1]?.type,
      egg_group1: egg_groups[0].names?.en,
      egg_group1_id: egg_groups[0].egg_group,
      egg_group2: egg_groups[1]?.names?.en,
      egg_group2_id: egg_groups[1]?.egg_group,
      ...spread_types
    }
    
    // for 1025 pokemons, will log progress 13 times
    // last log at 1014 which is pretty close
    if (pkmnIdx % 78 === 0 && pkmnIdx > 0) {
      const keys = Object.keys(r).filter(Boolean).length;
      const pgRatio = pkmnIdx / uniquePokemon.length
      const progress = Math.round(pgRatio * 100);
      const progressStr = progress.toFixed(0).padStart(3," ");
      const almostStr = pkmnIdx > 1000 ? ", Almost there!" : ".";
      const alreadyStr = pkmnIdx > 500 ? "already parsed" : "still parsing"
      const overlayedProgress = ansiProgressSlice(`ARCEUS - ${progressStr}%`, pgRatio, 2)
      console.log(`[${overlayedProgress}]=> Progress: ${alreadyStr} ${keys*pkmnIdx} data entries from ${pkmnIdx} pokemons${almostStr}`)
    }
    return r;
  })
  
  console.log(`[${ansiProgressSlice("ARCEUS - 100%", 1, 2)}]=> All done!\n\n\n`);
}
main();
