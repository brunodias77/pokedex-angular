export interface PokemonDetails {
  name: string;
  url: string;
  resutls: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
}

interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

interface NamedAPIResource {
  name: string;
  url: string;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

interface HeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

interface Move {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
  level_learned_at: number;
  version_group: NamedAPIResource;
  move_learn_method: NamedAPIResource;
}

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
  other: OtherSprites;
}

interface OtherSprites {
  dream_world: Sprite;
  home: Sprite;
  official_artwork: Sprite;
}

interface Sprite {
  front_default: string;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

interface Type {
  slot: number;
  type: NamedAPIResource;
}
