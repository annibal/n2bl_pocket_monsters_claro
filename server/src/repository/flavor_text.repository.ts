import getDB from "@/db/connection";
import { FlavorText, FlavorTextDatabase } from "@/types/flavor_text";
import { PokemonId } from "@/types/pokemon";
import { Version, VersionDatabase } from "@/types/version";

export class FlavorTextRepository {
  private db = getDB();

  getPokemonFlavors(pokemonId: PokemonId) {
    const query = `SELECT * FROM flavor_text WHERE flavor_text.pokemon_id = ?`;
    const flavors = this.db.prepare(query).all(pokemonId) as FlavorTextDatabase[];

    const versions = this.db.prepare(`SELECT * FROM versions`).all() as VersionDatabase[];
    
    const parsedFlavors: FlavorText[] = versions.map(v => {
      const flavor = flavors.find(f => f.version_id == v.id);
      const flavorText: FlavorText = {
        version: v.text,
        version_id: v.id,
        text: flavor?.text || null
      }
      return flavorText
    });

    return parsedFlavors;
  }
}
