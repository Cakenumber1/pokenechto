import { ThemeProvider } from '@mui/styles';
import CellComponent from 'components/Shop/CellComponent';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useGetShopPokemonIDsQuery } from 'store/service';
import { Autoplay, Navigation, Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { theme } from 'theme/index';

import { useStyles } from './style';

const MySwiper = () => {
  const { data: pokeIDs } = useGetShopPokemonIDsQuery(null);
  const pkeys = pokeIDs ? pokeIDs!.slice(0, 3) : null;
  const classes = useStyles();
  if (pkeys) {
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
        {pkeys.map((_key: any) => (
          <SwiperSlide key={_key}>
            <CellComponent pokeid={_key} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return <div />;
};

const SwiperShopComponent = () => (
  <ThemeProvider theme={theme}>
    <MySwiper />
  </ThemeProvider>

);

export default SwiperShopComponent;
