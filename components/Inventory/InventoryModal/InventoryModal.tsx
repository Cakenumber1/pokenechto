import { Chip, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import { CollectionItemType } from 'helpers/inventory/inventoryHelpers';
import { colorMap, getBackgdoundColor, namesMap } from 'helpers/maps';
import { useAuth } from 'myFirebase/AuthContext';
import React, { useState } from 'react';
import { useGetInventoryItemQuery, usePostMushroomsQuery } from 'store/service';

import { style } from './style';

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
  const { currentUser } = useAuth()!;
  const [zoomEntered, setZoomEntered] = useState(false);
  const { data } = useGetInventoryItemQuery(pokemon.collectionId);
  const { data: mushrooms } = usePostMushroomsQuery(currentUser.uid);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
    >
      <Zoom timeout={500} in={open} onEntered={() => setZoomEntered(true)}>
        <Box sx={style.modalBox}>
          {data && (
          <>
            <Slide direction="down" in={zoomEntered} timeout={1500}>
              <Box sx={style.modalImg({ background: getBackgdoundColor(data.types) })}>
                <img style={{ maxHeight: '100%', width: '100%', objectFit: 'contain' }} src={data.img} alt="" />
              </Box>
            </Slide>
            <h2>
              {data.name}{' #'}{data.id}
            </h2>
            <Box>
              <Stack direction="row" spacing={1} justifyContent="center">
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
            </Box>
            <Box>
              <Stack direction="column" spacing={1}>
                {data.stats.map((stat, index) => (
                  <Grow key={stat.statName} timeout={(index + 1) * 500} in={zoomEntered}>
                    <div> {namesMap.get(stat.statName) as string}:{` ${stat.statVal}`}
                      <LinearProgress
                        variant="determinate"
                        sx={style.modalStatProgress({
                          backgroundColor: colorMap.get(stat.statName) as string,
                        })}
                        value={Math.ceil((stat.statVal / 300) * 100)}
                      />
                    </div>
                  </Grow>
                ))}
              </Stack>
            </Box>
            <Box>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Button variant="contained" size="large" onClick={handleClose}>
                  Close
                </Button>
                <Button disabled={!mushrooms} variant="contained" size="large" onClick={handleClickMushroom}>
                  🍄 Mushroom {mushrooms?.count || ''}
                </Button>
              </Stack>
            </Box>
          </>
          )}
        </Box>

      </Zoom>
    </Modal>
  );
};
