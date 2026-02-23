
export interface Pokemon {
  id:                number;
  height:            number;
  weight:            number;
  baseExperience:    number;
  evolvesFrom:       number;

  genderRate:        number;
  captureRate:       number;
  baseHappiness:     number;
  isBaby:            boolean;
  hatchCounter:      number;
  hasGenderDiff:     boolean;
  isFormsSwitchable: boolean;
  isLegendary:       boolean;
  isMythical:        boolean;

  name:              string;
  generation:        string;
  region:            string;

  color:             string;
  colorId:           string;

  shape:             string;
  shapeDescription:  string;

  type1:             string;
  type1Id:           string;
  type2:             string | null;
  type2Id:           string | null;

  eggGroup1:         string;
  eggGroup1Id:       string;
  eggGroup2:         string | null;
  eggGroup2Id:       string | null;

  hp:                number;
  attack:            number;
  defense:           number;
  specialAttack:     number;
  specialDefense:    number;
  speed:             number;
}
