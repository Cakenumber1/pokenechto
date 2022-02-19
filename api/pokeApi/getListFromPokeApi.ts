import axios from 'axios';

import { Stat } from '../../interfaces';
import { PokemonsList } from '../../interfaces/pokemonListType';

async function getFromPokeApi(path = '') {
  const res = await axios.get(path);
  const { data } = res;
  const temp:any = {};
  temp.id = data.id;
  temp.name = data.name[0].toUpperCase() + data.name.substring(1);
  temp.img = data.sprites.other.dream_world.front_default;
  temp.abilities = [];
  data.abilities.forEach((a: any) => temp.abilities.push(a.ability.name));
  temp.height = data.height;
  temp.weight = data.weight;
  temp.stats = [];
  data.stats.forEach((a : any) => {
    const st: Stat = { statName: a.stat.name, statVal: a.base_stat };
    temp.stats.push(st);
  });
  temp.types = [];
  data.types.forEach((a: any) => temp.types.push(a.type.name));
  temp.exp = data.base_experience;
  return temp;
}

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
  const pokemons = await Promise.all(temp.results.map((pokemon) => getFromPokeApi(pokemon.url)));
  pokemons.forEach((pokemon, index) => {
    temp.results[index].fullInfo = pokemon;
  });
  return temp;
}
