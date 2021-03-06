import {
  Ability, GameIndex, HeldItem, NameAndUrl, Types, RawStat, Move, Sprite,
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
  limit: number,
  amount: number,
} | undefined;
