import axios from 'axios'

type Pokemon = {
    id: number,
    name: string,
    img: string,
    abilities: string[],
    height: number,
    weight: number,
    stats: Stat[],
    types: string[],
    exp: number,
} | undefined;

export type PokemonsListResults = {
    name: string,
    url: string,
    img?: string,
    fullInfo?: Pokemon
}

export type PokemonsList = {
    count: number,
    next: string,
    previous: string,
    results: PokemonsListResults[]
}

type Stat = {
    statName: string,
    statVal: number
};

export async function getFromPokeApi(id : number, target: string = 'pokemon', path = '' ) {
    if (!path) path = `https://pokeapi.co/api/v2/${target}/${id}`;
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

export async function getListFromPokeApi(offset: number, limit: number) {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    const data = res.data;
    const temp: PokemonsList = {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results
    };
    for (const pokemon of temp.results) {
        pokemon.fullInfo = await getFromPokeApi(-1, 'fromList', pokemon.url);
    }
    return temp
}


