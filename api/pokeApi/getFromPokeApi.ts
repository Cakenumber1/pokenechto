import axios from 'axios';
import { PokemonsList } from '../../interfaces/pokemonListType';
import { parseResponsePokemon } from '../../helpers';

export async function getFromPokeApi(path: string) {
  return await axios.get(path)
    .then(res => {
      return res.data;
    })
    .catch(console.error);
}

export const createPath = (offset: number = 1, limit: number = 9) =>
  `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

export async function getListFromPokeApi(path: string) {
  const res = await axios.get(path)
  const data = res.data;
  const temp: PokemonsList = {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results
  };
  for (const pokemon of temp.results) {
    const t = await getFromPokeApi(pokemon.url);
    pokemon.fullInfo = parseResponsePokemon(t);
  }
  return temp
}

