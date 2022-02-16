import { ThemeProvider } from '@mui/styles';
import CellComponent from 'components/Shop/CellComponent';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Autoplay, Navigation, Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { theme } from 'theme/index';

import { useStyles } from './style';

type Props = {
  pokemons: PokemonsListResults[]
};

const MySwiper = ({ pokemons } : Props) => {
  const classes = useStyles();
  return (
    <Swiper
      allowTouchMove={isMobile}
      navigation={!isMobile}
      modules={isMobile ? [Pagination, Autoplay] : [Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{
        dynamicBullets: true,
      }}
      className={classes.item}
    >
      {pokemons.map((pokemon, index: number) => (
        <SwiperSlide key={index}>
          <CellComponent pokemon={pokemon.fullInfo} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SwiperShopComponent: React.FC<Props> = ({ pokemons }) => (
  <ThemeProvider theme={theme}>
    <MySwiper pokemons={pokemons} />
  </ThemeProvider>

);

export default SwiperShopComponent;
