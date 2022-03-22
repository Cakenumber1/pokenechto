import { Box, Button, Modal } from '@mui/material';
import { colorMap, namesMap } from 'helpers/maps';
import { Pokemon } from 'interfaces';

type Props = {
  open: boolean
  pokemon: Pokemon,
  handleBuy: () => void,
  handleClose: () => void,
  isDisabledMoneyButton: boolean,
  modalStyle: string,
  buttonStyle: string,
  imgStyle: string
};

const PokeModal = ({
  open, pokemon, handleBuy, handleClose, isDisabledMoneyButton, modalStyle, buttonStyle, imgStyle,
}: Props) => (
  <Modal open={open} hideBackdrop>
    <Box
      className={modalStyle}
    >
      <button type="button" className={buttonStyle} onClick={handleClose}>Back</button>
      <Box style={{
        background: 'grey',
        width: '100%',
        height: '100%',
        display: 'flex',
        top: 0,
        left: 0,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
      >
        <img
          className={imgStyle}
          src={pokemon!.img}
          alt={pokemon!.name}
        />
        <Box style={{
          width: '100%', padding: '2vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <Box style={{
            textAlign: 'center',
            fontSize: 'large',
          }}
          >{pokemon!.name.toUpperCase()}
          </Box>
          <Box style={{ textAlign: 'center' }}>
            Types
            {pokemon!.types.map((type: any) => (
              <Box key={type}>{type}</Box>
            ))}
          </Box>
          <Box style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
          >
            <Box style={{
              textAlign: 'center',
            }}
            >
              <Box>
                Weight
              </Box>
              <Box>
                {pokemon!.weight / 10}KG
              </Box>
            </Box>
            <Box style={{
              textAlign: 'center',
            }}
            >
              <Box>Height</Box>
              <Box>
                {pokemon!.height / 10} M
              </Box>
            </Box>
          </Box>
          <Box style={{ padding: '2vh' }}>
            <Box style={{ textAlign: 'center' }}>Abilities</Box>
            <Box style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
            >
              {pokemon!.abilities.map((ab: any) => (
                <Box key={ab}>{ab}</Box>
              ))}
            </Box>
          </Box>
          <Box className="stats" style={{ width: '100%' }}>
            <Box style={{ textAlign: 'center' }}>Stats</Box>
            {pokemon!.stats.map((stat: any) => (
              <Box
                key={stat.statName}
                style={{
                  display: 'flex',
                  padding: '.5vh 10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box style={{ width: '20%' }}>{namesMap.get(stat.statName)}: {stat.statVal}/300</Box>
                <Box style={{
                  width: '100%',
                  height: '3vh',
                  background: 'dimgrey',
                  borderRadius: '50vmax',
                }}
                >
                  <Box style={{
                    height: '100%',
                    background: colorMap.get(stat.statName),
                    width: `${stat.statVal / 3}%`,
                    borderRadius: '50vmax',
                    textAlign: 'center',
                  }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
          <Box style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
          />
          <Button
            style={{ maxWidth: '30%' }}
            disabled={isDisabledMoneyButton}
            onClick={handleBuy}
            variant="contained"
          >Buy 500$
          </Button>
        </Box>
      </Box>
    </Box>
  </Modal>
);

export default PokeModal;
