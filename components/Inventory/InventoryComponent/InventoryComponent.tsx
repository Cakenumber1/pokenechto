import React from 'react';
import styles from './InventoryComponent.module.css';
import {InventoryPokemonCardComponent} from '../InventoryPokemonCardComponent';
import {PokemonCollectionItemType} from '../types';

export type InventoryComponentProps = {
  pokemonCollection: PokemonCollectionItemType[];
};

export const InventoryComponent = ({pokemonCollection}: InventoryComponentProps) => {
  return (
    <div className={styles.inventory}>
      {pokemonCollection.map(({id, pokemonId, pokemonImage}) => (
        <div key={id} className={styles.inventoryItem}>
          <InventoryPokemonCardComponent
            id={id}
            pokemonId={pokemonId}
            pokemonImage={pokemonImage}
          />
        </div>
      ))}
    </div>
  );
};
