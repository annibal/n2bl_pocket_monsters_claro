// ARCEUS
// the Pokémon that shaped the universe with its 1,000 arms.
//
// This script transforms the data fetched from RESHIRAM
// and inserts into the database that ZYGARDE schematized.
//
import getAllPkmnData, { ansiProgressSlice } from "./RESHIRAM.js";
import { letsGoDatabase } from "./ZYGARDE.js";

//#region Helpers

function without(obj, _keys) {
  let keys = _keys;
  if (typeof _keys === "string") { keys = _keys.split(",").map(k => k.trim()); }
  // TODO: pass obj with { key: true (keep), otherKey: false (discard) }
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (keys.includes(key)) { return acc; }
    return { ...acc, [key]: val };
  }, {})
}

//#endregion Helpers
// -------------------------------------
//#region Main_Fn

async function main() {
  console.log(`[ARCEUS]=> init();`);

  console.log(`[ARCEUS]=> invoke RESHIRAM to fetch truthful csv data`);
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
  console.log(`[ARCEUS]=> Using english (en) due to inconsistent translation.`);
  console.log(`[ARCEUS]=> Japanese (jp) is probably a valid alternative with 100% translated entities.`);

  let versions = allPokemonData.versions.map(v => ({
    id: v.id,
    name: allPokemonData.version_names.find(vn => vn.version_id === v.id && vn.local_language_id === mapLangs.en).name
  }))
  console.log(`[ARCEUS]=> Game versions: ${versions.length}`);
  
  let flavors = allPokemonData.pokemon_species_flavor_text.filter(fl => fl.language_id === mapLangs.en).map(fl => ({
    pokemon_id: fl.species_id,
    version_id: fl.version_id,
    text: fl.flavor_text
  }));
  console.log(`[ARCEUS]=> Pokemon flavor texts: ${flavors.length}`);

  const pokemons = allPokemonData.pokemon.slice().filter(pkmn => pkmn.is_default).map((pkmn, pkmnIdx) => {
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
    // const flavor_universe = allPokemonData.pokemon_species_flavor_text.filter(x => x.species_id == pkmn.species_id);
    // const flaversions = flavor_universe.map(x => x.version_id);
    // const unique_versions = Array.from(new Set(flaversions));
    // const flavor_text = unique_versions.reduce((accv, cvid) => {
    //   const cvstr = mapPokemonData.versions[cvid].identifier;
    //   return {
    //     ...accv,
    //     [cvstr]: {
    //       version_name: allPokemonData.version_names
    //         .filter(lnvn => lnvn.version_id == cvid)
    //         .reduce((a,c) => ({ ...a, [mapLangs[c.local_language_id]]: c.name }), {})
    //         .en
    //       ,
    //       text: flavor_universe
    //         .filter(flv => flv.version_id === cvid)
    //         .reduce((a,c) => ({ ...a, [mapLangs[c.language_id]]: c.flavor_text }), {})
    //         .en
    //     }
    //   }
    // }, {});

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

    if (spread_types["special-attack"]) {
      spread_types.special_attack = spread_types["special-attack"];
      delete spread_types["special-attack"];
    }
    if (spread_types["special-defense"]) {
      spread_types.special_defense = spread_types["special-defense"];
      delete spread_types["special-defense"];
    }

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
    
    // flavor_text_red_blue: flavor_text.red?.text,
    // flavor_text_gold_silver: flavor_text.gold?.text,
    // flavor_text_ruby_sapphire: flavor_text.ruby?.text,
    // flavor_text_firered_leafgreen: flavor_text.firered?.text,
    // flavor_text_heartgold_soulsilver: flavor_text.soulsilver?.text || flavor_text.heartgold?.text,
    // flavor_text_black_white: flavor_text.black?.text,
    // flavor_text_x_y: flavor_text.x?.text,
    // flavor_text_omegaruby_alphasapphire: flavor_text["omega-ruby"]?.text,
    // flavor_text_lets_go: flavor_text["lets-go-pikachu"]?.text,
    // flavor_text_sword: flavor_text.sword?.text,
    // flavor_text_shield: flavor_text.shield?.text,
    let r = {
      ...without(pkmn, "species_id"),
      ...without(species, "generation_id,color_id,shape_id,habitat_id,growth_rate_id,order"),
      order_index: species.order,
      name: species_name.en,
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

      hp: null,
      attack: null,
      defense: null,
      special_attack: null,
      special_defense: null,
      speed: null,
      accuracy: null,
      evasion: null,
      special: null,
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
  });
  console.log(`[${ansiProgressSlice("ARCEUS - 100%", 1, 2)}]=> Data parsed successfully!`);
  
  console.log(Object.keys(pokemons[0]).filter(key => !key.startsWith("flavor")).join(", ") );

  console.log(`[ARCEUS]=> Lets go, database:`);
  letsGoDatabase({ pokemons, flavors, versions})

  console.log(`\n[ARCEUS]=> All done!\n\n`);
}
main();

//#endregion Main_Fn
// -------------------------------------
