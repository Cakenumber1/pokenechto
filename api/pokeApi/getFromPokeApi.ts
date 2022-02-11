import axios from 'axios';

export async function getFromPokeApi(id: number, target: string = 'pokemon') {
  return await axios.get(`https://pokeapi.co/api/v2/${target}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(console.error);
}
