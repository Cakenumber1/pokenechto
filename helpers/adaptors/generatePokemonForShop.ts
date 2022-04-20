import { Pokemon, PokemonShop } from 'interfaces';

export function generatePokemonForShop(poke: Pokemon) {
  const limit = 1;
  const amount = 1;
  const temp: PokemonShop = {
    ...poke!,
    limit,
    amount,
    price: 300,
    pid: '-',
  };
  return temp;
}
