import axios from 'axios';

export const getFromPokeApi = async (path: string) => axios.get(path)
  .then((res) => res.data)
  .catch(console.error);
