import React, { useEffect } from 'react';
import { Pokemon } from '../../../interfaces';
import CellComponent from '../CellComponent';
import css from './ShelfComponent.module.scss'
import { PokemonsListResults } from '../../../interfaces/pokemonListType';

type Props = {
  pokemons: PokemonsListResults[],
}
const ShelfComponent: React.FC<Props> = ({pokemons}) => {
  return (
    <div className={`${css.ShelfComponent} ${css.boxShadow}`}>
      {pokemons.map((poke, index :number) =>
        (<CellComponent pokemon={poke.fullInfo} key ={index}/>)
      )}
    </div>
  )
}

export default ShelfComponent;
