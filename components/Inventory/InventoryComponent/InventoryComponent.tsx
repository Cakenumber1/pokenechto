import React from "react";
import styles from "./InventoryComponent.module.css";
import { InventoryPokemonCardComponent } from "../InventoryPokemonCardComponent";
import { PokemonCollectionType } from "../../../helpers/inventoryHelpers";

export type InventoryComponentProps = {
  pokemonCollection: PokemonCollectionType[];
};

export const InventoryComponent = ({
  pokemonCollection,
}: InventoryComponentProps) => {
  return (
    <div className={styles.inventory}>
      {pokemonCollection.map(({ collectionId, pokemonId, pokemonImage }) => (
        <div key={collectionId} className={styles.inventoryItem}>
          <InventoryPokemonCardComponent
            collectionId={collectionId}
            pokemonId={pokemonId}
            pokemonImage={pokemonImage}
          />
        </div>
      ))}
    </div>
  );
};
