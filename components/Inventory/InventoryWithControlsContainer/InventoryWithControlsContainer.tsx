import { InventoryComponent } from 'components/Inventory/InventoryComponent';
import { InventoryModal } from 'components/Inventory/InventoryModal';
import { InventoryPopover } from 'components/Inventory/InventoryPopover';
import { PokemonCollectionItemProp } from 'helpers/inventoryHelpers';
import * as React from 'react';
import { useCallback, useState } from 'react';

export type InventoryWithControlsContainerProps = {
  pokemonCollection: PokemonCollectionItemProp[];
};
export const InventoryWithControlsContainer = ({
  pokemonCollection,
}: InventoryWithControlsContainerProps) => {
  const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLElement | null>(null);
  const [isTopHalfOfScreen, setIsTopHalfOfScreen] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<{ id: number; sprite: string } | null>(null);

  const handleClickCard = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      pokemonProp: { id: number; sprite: string },
    ) => {
      setPopoverAnchorElement(event.currentTarget);
      setIsTopHalfOfScreen(event.clientY > window.innerHeight / 2);
      setPokemon(pokemonProp);
    },
    [],
  );

  const handleClosePopover = useCallback(() => {
    setPopoverAnchorElement(null);
  }, []);

  const handleClickPokemonControls = useCallback((event, buttonClicked) => {
    switch (buttonClicked) {
      case 'info':
        setModalOpen(true);
        handleClosePopover();
        break;
      case 'gift':
        // smth doing with click on gift
        break;
      default: break;
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <InventoryComponent
        pokemonCollection={pokemonCollection}
        onClickCard={handleClickCard}
      />
      {popoverAnchorElement && (
      <InventoryPopover
        anchorEl={popoverAnchorElement}
        onClose={handleClosePopover}
        isTopHalfOfScreenClicked={isTopHalfOfScreen}
        onClickControls={handleClickPokemonControls}
      />
      )}
      {modalOpen && (
      <InventoryModal
        open={modalOpen}
        pokemon={pokemon}
        onClose={handleCloseModal}
      />
      )}
    </>
  );
};
