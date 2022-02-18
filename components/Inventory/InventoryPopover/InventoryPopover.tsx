import Popover from '@mui/material/Popover';
import * as React from 'react';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';

export const InventoryPopover = ({
  anchorEl,
  onClose: handleClosePopover,
  isTopHalfOfScreenClicked,
  onClickControls: handleClickPokemonControls,
}: any) => {
  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? 'simple-popover' : undefined;

  return (
    <Popover
      id={popoverId}
      open={popoverOpen}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: isTopHalfOfScreenClicked ? 'top' : 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: isTopHalfOfScreenClicked ? 'bottom' : 'top',
        horizontal: 'center',
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
        size="large"
      >
        <Button
          onClick={(event) => handleClickPokemonControls(event, 'info')}
          color="info"
          startIcon={<InfoOutlinedIcon />}
        >
          Info
        </Button>
        <Button
          onClick={(event) => handleClickPokemonControls(event, 'gift')}
          color="secondary"
          startIcon={<CardGiftcardOutlinedIcon />}
        >
          Gift
        </Button>
      </ButtonGroup>
    </Popover>
  );
};
