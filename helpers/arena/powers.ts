import { countStats } from 'helpers/adaptors/countPower';
import { PokemonIni } from 'interfaces/pokemonType';

export const typesArr = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
export const powerMatrix = [
  [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
  [1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1, 1],
  [1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1, 1],
  [1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
  [1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 0.5, 1],
  [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1, 2],
  [1, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 0.5, 2, 1, 1, 2, 0.5, 1, 1],
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1],
  [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1, 1],
  [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1, 1],
  [1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0, 1],
  [1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5],
  [1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 2, 2, 1],
];

export const estimatePower = (poke1: PokemonIni, poke2: PokemonIni) => {
  let k1 = 1;
  let k2 = 1;
  const types1: number[] = [];
  const types2: number[] = [];
  poke1.types.forEach((t) => {
    types1.push(typesArr.indexOf(t));
  });
  poke2.types.forEach((t) => {
    types2.push(typesArr.indexOf(t));
  });
  types1.forEach((t1) => {
    types2.forEach((t2) => {
      k1 += powerMatrix[t1][t2];
    });
  });
  types2.forEach((t1) => {
    types1.forEach((t2) => {
      k2 += powerMatrix[t1][t2];
    });
  });
  const p1 = countStats(poke1).power;
  const p2 = countStats(poke2).power;
  if (((((k1 / k2) * p1) - p2) / p1) > 0.3) {
    return { result: 'Easy Fight', color: 'lime' };
  }
  if (((((k1 / k2) * p1) - p2) / p1) > 0.1) {
    return { result: 'Fine Fight', color: 'greenyellow' };
  }
  if (((((k1 / k2) * p1) - p2) / p1) < 0.1 && ((((k1 / k2) * p1) - p2) / p1) > -0.1) {
    return { result: 'Close Fight', color: 'yellow' };
  }
  if ((((((k1 / k2) * p1) - p2) / p1) > -0.3)) {
    return { result: 'Hard Fight', color: 'orange' };
  }
  return { result: 'Extreme  Fight', color: 'red' };
};
