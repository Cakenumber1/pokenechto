import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { PokemonIni } from 'interfaces/pokemonType';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Controller, EffectCards } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import { useStylesSwiper } from './style';

type Props = {
  initialPokes: PokemonIni[],
  slide: any,
  setSlide: React.Dispatch<React.SetStateAction<any>>,
};

const RegisterPokeComponent: React.FC<Props> = ({
  initialPokes,
  slide,
  setSlide,
}) => {
  const classes = useStylesSwiper();
  function getTopStat(poke: PokemonIni) {
    const soretedPoke = poke.stats.slice(0);
    soretedPoke.sort((a, b) => b.statVal - a.statVal);
    return soretedPoke[0].statName; // poke.stats.sort((a, b) => a.statVal - b.statVal).slice(0, 1);
  }
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>Изначальный покемон</Typography>
      <Swiper
        onSwiper={setSlide}
        controller={{ control: slide }}
        className={classes.swiper}
        effect="cards"
        grabCursor
        modules={[Controller, EffectCards]}
      >
        {initialPokes.map((poke, key) => (
          <SwiperSlide className={classes.swiperSlide} key={key}>
            <Typography className={classes.header}>{poke!.name.toUpperCase()}</Typography>
            <img
              src={poke!.img}
              width="95%"
              height="50%"
              style={{ aspectRatio: '1/1' }}
              alt=""
            />
            <Box sx={{
              display: 'flex',
              height: '100%',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Box>Types: </Box>
                {poke!.types.map((a, key2) => (
                  <Box key={key2}>{a}</Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Box>Spec:</Box>
                <Box>{getTopStat(poke)}</Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default RegisterPokeComponent;
