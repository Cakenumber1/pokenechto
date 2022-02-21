import axios from 'axios';
import { parseResponsePokemon } from 'helpers';

export async function getFromPokeApi(path: string) {
  return axios.get(path)
    .then((res) => res.data)
    .catch(console.error);
}

export const createPath = (offset: number = 1, limit: number = 9) => `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

export const createKey = (offset: number) => `https://pokeapi.co/api/v2/pokemon?offset=${offset * 12}&limit=12`;

export async function getListFromPokeApi() {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${1}&limit=${9}`);
  const { data } = res;
  const pokemons = await Promise.all(
    data.results.map((pokemon : any) => getFromPokeApi(pokemon.url)),
  );
  let temp = [];
  for (let i = 0; i < 9; i++) {
    temp.push(parseResponsePokemon(pokemons[i]));
  }
  return temp;
}
