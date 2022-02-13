import React from 'react';
import styles from './InventoryPokemonCard.module.scss';
import {PokemonCollectionItemType} from '../types';

export type InventoryPokemonCardComponentProps = PokemonCollectionItemType;

export const InventoryPokemonCardComponent = ({
  pokemonImage,
  pokemonId,
}: InventoryPokemonCardComponentProps) => {
  return (
    <img
      className={styles.inventoryPokemonCard}
      src={pokemonImage}
      alt={`Name of Pokemon#${pokemonId}`}
    />
  );
};
