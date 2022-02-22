import { Chip, linearProgressClasses, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import { CollectionItemType } from 'helpers/inventoryHelpers';
import { colorMap, namesMap } from 'helpers/types';
import { getBackgdoundColor } from 'helpers/types/colorMap';
import * as React from 'react';
import { useState } from 'react';
import { useGetInventoryItemQuery, useGetMushroomsQuery } from 'store/service';

// TODO: временное для показать
const borderLinearProgress = (color: string) => ({
  width: '100%',
  height: 15,
  marginBottom: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'black',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: color,
  },
});

export type InventoryModalProps = {
  open: boolean
  pokemon: CollectionItemType,
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void
  onMushroom: (event: React.MouseEvent<HTMLButtonElement>) => void
};

export const InventoryModal = ({
  open,
  pokemon,
  onClose: handleClose,
  onMushroom: handleClickMushroom,
}: InventoryModalProps) => {
  const [zoomEntered, setZoomEntered] = useState(false);
  const { data } = useGetInventoryItemQuery(pokemon.collectionId);
  const { data: mushrooms } = useGetMushroomsQuery();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
    >
      <Zoom timeout={500} in={open} onEntered={() => setZoomEntered(true)}>
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          {data && (
          <>
            <Slide direction="down" in={zoomEntered} timeout={1500}>
              <img style={{ height: 200 }} src={data.img} alt="" />
            </Slide>
            <div>
              <h3>
                {data.name}{' #'}{data.id}
              </h3>
              <Stack direction="row" spacing={1}>
                {data.types.map(
                  (type) => (
                    <Chip
                      key={type}
                      label={type}
                      sx={{ backgroundColor: getBackgdoundColor([type]) }}
                    />
                  ),
                )}
              </Stack>
            </div>
            <Stack direction="column" spacing={1}>
              {data.stats.map((stat, index) => (
                <Grow key={stat.statName} timeout={(index + 1) * 500} in={zoomEntered}>
                  <div> {namesMap.get(stat.statName) as string}:{` ${stat.statVal}`}
                    <LinearProgress
                      variant="determinate"
                      sx={borderLinearProgress(colorMap.get(stat.statName) as string)}
                      value={Math.ceil((stat.statVal / 300) * 100)}
                    />
                  </div>
                </Grow>
              ))}
            </Stack>
            <Button variant="contained" size="large" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" size="large" onClick={handleClickMushroom}>
              🍄 Mushroom {mushrooms?.count || ''}
            </Button>
          </>
          )}
        </Box>

      </Zoom>
    </Modal>
  );
};
