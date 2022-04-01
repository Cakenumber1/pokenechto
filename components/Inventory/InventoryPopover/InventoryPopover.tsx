import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import { HandleClickPopoverControls } from 'helpers/inventory/inventoryHelpers';
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
          onClick={handleClickControls}
          color="info"
          startIcon={<InfoOutlinedIcon />}
          data-button-name="info"
        >
          Info
        </Button>
        <Button
          onClick={handleClickControls}
          color="error"
          startIcon={<DeleteForeverIcon />}
          data-button-name="delete"
        >
          Delete
        </Button>
      </ButtonGroup>
    </Popover>
  );
};
