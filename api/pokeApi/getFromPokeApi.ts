import axios from 'axios';
import { parseResponsePokemon } from 'helpers';

export async function getFromPokeApi(path: string) {
  return axios.get(path)
    .then((res) => res.data)
    .catch(console.error);
}

export async function getListFromPokeApi() {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${Math.round(Math.random() * 300)}&limit=${9}`);
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
