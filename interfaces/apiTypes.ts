import { PokemonMail } from 'interfaces/pokemonType';

export type FromToPoke = {
  from: string,
  fromMail: string,
  to: string,
  toMail: string,
  text: string,
  money?: number,
  berries?: number,
  poke?: PokemonMail,
};
