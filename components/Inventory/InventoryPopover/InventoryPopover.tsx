import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import { HandleClickPopoverControls } from 'helpers/inventoryHelpers';
import * as React from 'react';

type InventoryPopoverProps = {
  anchorEl: HTMLElement | null
  onClose: ()=>void,
  isTopHalfOfScreenClicked: boolean,
  onClickControls: HandleClickPopoverControls
};

export const InventoryPopover = ({
  anchorEl,
  onClose: handleClosePopover,
  isTopHalfOfScreenClicked,
  onClickControls: handleClickControls,
}: InventoryPopoverProps) => {
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
          onClick={(event) => handleClickControls(event, 'info')}
          color="info"
          startIcon={<InfoOutlinedIcon />}
        >
          Info
        </Button>
        <Button
          onClick={(event) => handleClickControls(event, 'gift')}
          color="secondary"
          startIcon={<CardGiftcardOutlinedIcon />}
        >
          Gift
        </Button>
      </ButtonGroup>
    </Popover>
  );
};