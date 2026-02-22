export type PokemonId = number & { readonly __brand: 'PokemonId' }
export const toPokemonId = (id: number | string): PokemonId => Number(id) as PokemonId

export interface PokemonDatabase {
  id:                      PokemonId;
  height:                  number;
  weight:                  number;
  base_experience:         number;
  evolves_from_species_id: number;

  gender_rate:             number;
  capture_rate:            number;
  base_happiness:          number;
  is_baby:                 number;
  hatch_counter:           number;
  has_gender_differences:  number;
  forms_switchable:        number;
  is_legendary:            number;
  is_mythical:             number;

  name:                    string;
  generation:              string;
  region:                  string;

  color:                   string;
  color_id:                string;

  shape:                   string;
  shape_description:       string;

  type1:                   string;
  type1_id:                string;
  type2:                   string | null;
  type2_id:                string | null;

  egg_group1:              string;
  egg_group1_id:           string;
  egg_group2:              string | null;
  egg_group2_id:           string | null;

  hp:                      number;
  attack:                  number;
  defense:                 number;
  special_attack:          number;
  special_defense:         number;
  speed:                   number;
}

export interface Pokemon {
  id:                      PokemonId;
  height:                  number;
  weight:                  number;
  baseExperience:          number;
  evolvesFrom:             number;

  genderRate:              number;
  captureRate:             number;
  baseHappiness:           number;
  isBaby:                  boolean;
  hatchCounter:            number;
  hasGenderDiff:           boolean;
  isFormsSwitchable:       boolean;
  isLegendary:             boolean;
  isMythical:              boolean;

  name:                    string;
  generation:              string;
  region:                  string;

  color:                   string;
  color_id:                string;

  shape:                   string;
  shape_description:       string;

  type1:                   string;
  type1_id:                string;
  type2:                   string | null;
  type2_id:                string | null;

  egg_group1:              string;
  egg_group1_id:           string;
  egg_group2:              string | null;
  egg_group2_id:           string | null;

  hp:                      number;
  attack:                  number;
  defense:                 number;
  special_attack:          number;
  special_defense:         number;
  speed:                   number;
}
