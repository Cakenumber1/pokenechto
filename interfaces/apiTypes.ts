import { PokemonMail } from 'interfaces/pokemonType';

export type MailType = {
  from: string,
  fromMail: string,
  to: string,
  toMail: string,
  text: string,
  money?: number,
  berries?: number,
  poke?: PokemonMail,
};

export type MailExtType = {
  mailId: string,
  uid: string,
  from: string,
  to: string,
  text: string,
  money?: number,
  berries?: number,
  poke?: PokemonMail,
};
