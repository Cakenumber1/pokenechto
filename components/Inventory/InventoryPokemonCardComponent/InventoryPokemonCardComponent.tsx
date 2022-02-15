import React from "react";
import styles from "./InventoryPokemonCard.module.scss";
import { PokemonCollectionType } from "../../../helpers/inventoryHelpers";

export const InventoryPokemonCardComponent = ({
  pokemonImage,
  pokemonId,
}: PokemonCollectionType) => {
  return (
    <img
      className={styles.inventoryPokemonCard}
      src={pokemonImage}
      alt={`Name of Pokemon#${pokemonId}`}
    />
  );
};
