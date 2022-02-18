import * as React from 'react';
import { useCallback, useState } from 'react';
import { InventoryComponent } from 'components/Inventory/InventoryComponent';
import { PokemonCollectionItemProp } from 'helpers/inventoryHelpers';
import { InventoryPopover } from 'components/Inventory/InventoryPopover';
import { InventoryModal } from 'components/Inventory/InventoryModal';

export type InventoryWithControlsContainerProps = {
  pokemonCollection: PokemonCollectionItemProp[];
};
export const InventoryWithControlsContainer = ({
  pokemonCollection,
}: InventoryWithControlsContainerProps) => {
  const [popoverAnchorElement, setPopoverAnchorElement] =
    useState<HTMLElement | null>(null);
  const [isTopHalfOfScreen, setIsTopHalfOfScreen] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [pokemonSprite, setPokemonSprite] = useState<string>('');

  const handleClickCard = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      pokemon: { id: number; sprite: string },
    ) => {
      setPopoverAnchorElement(event.currentTarget);
      setIsTopHalfOfScreen(event.clientY > window.innerHeight / 2);
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
      <InventoryPopover
        anchorEl={popoverAnchorElement}
        onClose={handleClosePopover}
        isTopHalfOfScreenClicked={isTopHalfOfScreen}
        onClickControls={handleClickPokemonControls}
      />
      <InventoryModal
        open={modalOpen}
        pokemon={{ id: pokemonId, sprite: pokemonSprite }}
        onClose={handleCloseModal}
      />
    </>
  );
};
