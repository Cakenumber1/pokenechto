import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { useStylesSwiper } from 'components/Auth/Register/RegisterComponent/RegisterPokeComponent/style';
import { PokemonIni } from 'interfaces/pokemonType';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { EffectCards, Controller } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  initialPokes: PokemonIni[]
};

const RegisterPokeComponent: React.FC<Props> = ({
  initialPokes,
}) => {
  console.log(initialPokes)
  const classes = useStylesSwiper();
  // @ts-ignore
  const [slide, setSlide] = useState<Swiper | Swiper[] | undefined>(null);
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
            <Typography>{poke!.name.toUpperCase()}</Typography>
            <img
              src={poke!.img}
              width="95%"
              height="50%"
              style={{ aspectRatio: '1/1' }}
              alt=""
            />
            <Box>
              1
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <button type={'button'} onClick={() => console.log(slide!.realIndex)}/>
    </Grid>
  );
};

export default RegisterPokeComponent;
