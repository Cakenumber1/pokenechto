import { Pokemon } from "./pokemonType"

export type Limits = {
  offset : number,
  limit : number
}

export type PokemonsListResults = {
  name: string,
  url: string,
  img: string,
  fullInfo: Pokemon
}

export type PokemonsList = {
  count: number,
  next: string,
  previous: string,
  results: PokemonsListResults[]
}
