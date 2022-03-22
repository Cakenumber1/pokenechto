import { ThemeProvider } from '@mui/styles';
import CellContainer from 'components/Shop/Cell/CellContainer';
import { useStyles } from 'components/Shop/Swiper/style';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Autoplay, Navigation, Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { theme } from 'theme/index';

type Props = {
  pkeys: any,
};

const MySwiper: React.FC<Props> = ({ pkeys }) => {
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
      {pkeys.map((_key: any) => (
        <SwiperSlide key={_key}>
          <CellContainer pokeid={_key} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SwiperShopComponent: React.FC<Props> = ({ pkeys }) => (
  <ThemeProvider theme={theme}>
    {pkeys
      && (
        <MySwiper pkeys={pkeys} />
      )}
  </ThemeProvider>

);

export default SwiperShopComponent;
