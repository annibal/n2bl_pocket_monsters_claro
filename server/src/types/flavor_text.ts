import { PokemonId } from "@/types/pokemon";
import { VersionId } from "@/types/version";

export type FlavorTextDatabase = {
  pokemon_id: PokemonId;
  version_id: VersionId;
  text: string;
}

export type FlavorText = {
  text: string | null;
  version_id: VersionId;
  version: string;
}
