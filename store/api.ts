import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, RawPokemon } from 'interfaces/index';
import { PokemonsList } from 'interfaces/pokemonListType';
import { Ability, RawStat, Types } from 'interfaces/rawPokemonTypes';

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: (offset: number) => `pokemon?offset=${offset * 12}&limit=12`,
      transformResponse: (response: PokemonsList) => {
        const obj : Partial<PokemonsList> = {
          results: response.results,
          next: response.next,
          previous: response.previous,
        };
        return obj;
      },
    }),
    getPokemonByName: builder.query({
      query: (name:string) => `pokemon/${name}`,
      transformResponse: (data: RawPokemon) => {
        const temp : Partial<Pokemon> = {
          id: data.id,
          name: data.name[0].toUpperCase() + data.name.substring(1),
          img: data.sprites.other.dream_world.front_default,
          abilities: data.abilities.map((a: Ability) => a.ability.name),
          height: data.height,
          weight: data.weight,
          stats: data.stats.map((a : RawStat) => ({ statName: a.stat.name, statVal: a.base_stat })),
          types: data.types.map((a: Types) => a.type.name),
          exp: data.base_experience,
        };
        return temp;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;
