import axios from 'axios'
import { PokemonsList} from "../../interfaces/pokemonListType";
import { Stat } from '../../interfaces'

async function getFromPokeApi(path = '' ) {
    const res = await axios.get(path)
    const data = res.data;
    const temp:any = {};
    temp.id = data.id;
    temp.name = data.name;
    temp.img = data.sprites.other.dream_world.front_default
    temp.abilities = [];
    data.abilities.forEach((a: any) => temp.abilities.push(a.ability.name));
    temp.height = data.height;
    temp.weight = data.weight;
    temp.stats = [];
    data.stats.forEach((a : any) => {
        const st: Stat = {statName: a.stat.name, statVal: a.base_stat}
        temp.stats.push(st)
    });
    temp.types = [];
    data.types.forEach((a: any) => temp.types.push(a.type.name));
    temp.exp = data.base_experience;
    return temp
}

export const createPath = (offset: number, limit: number) =>
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

export async function getListFromPokeApi(path: string) {
    const res = await axios.get(path)
    const data = res.data;
    const temp: PokemonsList = {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results
    };
    for (const pokemon of temp.results) {
        pokemon.fullInfo = await getFromPokeApi(pokemon.url);
    }
    return temp
}


