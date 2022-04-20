import { Pokemon, Stat } from 'interfaces';

export function parseResponsePokemon(data: any) {
  const temp: any = {};
  temp.id = data.id;
  temp.name = data.name;
  temp.img = data.sprites.other.dream_world.front_default;
  temp.abilities = [];
  data.abilities.forEach((a: any) => temp.abilities.push(a.ability.name));
  temp.height = data.height;
  temp.weight = data.weight;
  temp.stats = [];
  data.stats.forEach((a: any) => {
    const st: Stat = { statName: a.stat.name, statVal: a.base_stat };
    temp.stats.push(st);
  });
  temp.types = [];
  data.types.forEach((a: any) => temp.types.push(a.type.name));
  temp.exp = data.base_experience;
  temp.limit = 1;
  temp.amount = 1;
  temp.price = 300;
  return temp as Pokemon;
}
