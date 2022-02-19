import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Stat } from 'interfaces/index';
import { PokemonsList } from 'interfaces/pokemonListType';

function getOffset(str: string) {
  const string = str.split('offset=')[1];
  const offset = string.split('&').shift();
  return Number(offset);
}

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: (offset: number) => `pokemon?offset=${offset * 12}&limit=12`,
      transformResponse: (response) => {
        const obj : any = {
          results: response.results,
          next: response.next,
          previous: response.previous,
        };

        return obj;
      },
    }),
    getPokemonByName: builder.query({
      query: (name:string) => `pokemon/${name}`,
      transformResponse: (data) => {
        const temp : any = {};
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
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;
