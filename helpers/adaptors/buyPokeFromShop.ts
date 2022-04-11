import { PokemonIni, PokemonShop } from 'interfaces';

export function generatePokemonForShop(poke: PokemonShop) {
  const temp = { ...poke };
  delete temp!.price;
  delete temp!.amount;
  delete temp!.pid;
  delete temp!.limit;
  return temp as PokemonIni;
}
