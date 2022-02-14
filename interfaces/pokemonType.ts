import { Stat } from './statType';

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
