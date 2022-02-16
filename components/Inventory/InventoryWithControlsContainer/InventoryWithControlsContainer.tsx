import { InventoryComponent } from '../InventoryComponent';
import { useState } from 'react';
import { Button, ButtonGroup, Popover } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FlakyIcon from '@mui/icons-material/Flaky';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import { PokemonCollectionItemProp } from '../../../helpers/inventoryHelpers';

export type InventoryWithControlsContainerProps = {
  pokemonCollection: PokemonCollectionItemProp[];
};
export const InventoryWithControlsContainer = ({
  pokemonCollection,
}: InventoryWithControlsContainerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    pokemonId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setPokemonId(pokemonId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <InventoryComponent
        pokemonCollection={pokemonCollection}
        onClickCard={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          size="large"
        >
          <Button color="info" startIcon={<InfoOutlinedIcon />}>
            Info
          </Button>
          <Button color="success" startIcon={<FlakyIcon />}>
            Feed
          </Button>
          <Button color="secondary" startIcon={<CardGiftcardOutlinedIcon />}>
            Gift
          </Button>
        </ButtonGroup>
      </Popover>
    </>
  );
};
