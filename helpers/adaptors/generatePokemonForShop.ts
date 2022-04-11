import { randomAnL } from 'helpers/adaptors/randomAnL';
import { Pokemon, PokemonShop } from 'interfaces';

export function generatePokemonForShop(poke: Pokemon) {
  const { limit, amount } = randomAnL();
  const temp: PokemonShop = {
    ...poke!,
    limit,
    amount,
    price: 300,
    pid: undefined,
  };
  return temp;
}
