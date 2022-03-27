import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { useStylesSwiper } from 'components/Auth/Register/RegisterComponent/RegisterPokeComponent/style';
import { PokemonIni } from 'interfaces/pokemonType';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Controller, EffectCards } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  initialPokes: PokemonIni[]
};

const RegisterPokeComponent: React.FC<Props> = ({
  initialPokes,
}) => {
  console.log(initialPokes);
  const classes = useStylesSwiper();
  // @ts-ignore
  const [slide, setSlide] = useState<Swiper | Swiper[] | undefined>(null);
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
            <Box>
              <Box>Types</Box>
              <Grid container spacing={2}>
                {poke!.types.map((a, key2) => (
                  <Grid item xs={4}>
                    <Box key={key2}>{a}</Box>
                  </Grid>
                ))}
              </Grid>
              <Box>Main attribute</Box>
              <Box>{getTopStat(poke)}</Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default RegisterPokeComponent;
