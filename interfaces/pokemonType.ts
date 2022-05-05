import {
  Ability, GameIndex, HeldItem, Move, NameAndUrl, RawStat, Sprite,
  Types,
} from './rawPokemonTypes';

export type RawPokemon = {
  abilities: Ability[],
  base_experience: number,
  forms: NameAndUrl[],
  game_indices: GameIndex[],
  height: number,
  held_items: HeldItem[],
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: Move[],
  name: string,
  order: number,
  past_types: any[],
  species: NameAndUrl,
  sprites: Sprite,
  stats: RawStat[],
  types: Types[],
  weight: number,
};

export type Stat = {
  statName: string,
  statVal: number,
};

export type Pokemon = {
  id: number,
  name: string,
  img: string,
  abilities: string[],
  height: number,
  weight: number,
  stats: Stat[],
  types: string[],
  exp: number,
} | undefined;

export type PokemonShop = {
  id: number,
  name: string,
  img: string,
  abilities: string[],
  height: number,
  weight: number,
  stats: Stat[],
  types: string[],
  exp: number,
  limit: number,
  amount: number,
  price: number,
  pid: string | undefined,
} | undefined;

export type PokemonIni = {
  id: number,
  name: string,
  img: string,
  abilities: string[],
  height: number,
  weight: number,
  stats: Stat[],
  types: string[],
  exp: number,
};

export type PokemonMail = {
  id: number,
  name: string,
  img: string,
  abilities: string[],
  height: number,
  weight: number,
  stats: Stat[],
  types: string[],
  exp: number,
  invId: string,
};

export type Opponent = {
  poke: PokemonIni,
  mail: string | null,
  name: string,
};
