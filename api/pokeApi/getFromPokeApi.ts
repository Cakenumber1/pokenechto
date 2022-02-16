import axios from 'axios';
import { parseResponsePokemon } from 'helpers';
import { PokemonsList } from 'interfaces/index';

export async function getFromPokeApi(path: string) {
  return axios.get(path)
    .then((res) => res.data)
    .catch(console.error);
}

export const createPath = (offset: number = 1, limit: number = 9) => `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

export const createKey = (offset: number) => `https://pokeapi.co/api/v2/pokemon?offset=${offset * 12}&limit=12`;

export async function getListFromPokeApi(path: string) {
  const res = await axios.get(path);
  const { data } = res;
  const temp: PokemonsList = {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results,
  };
  for (const pokemon of temp.results) {
    const t = await getFromPokeApi(pokemon.url);
    pokemon.fullInfo = parseResponsePokemon(t);
  }
  return temp;
}
