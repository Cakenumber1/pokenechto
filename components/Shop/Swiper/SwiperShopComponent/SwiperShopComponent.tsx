import { ThemeProvider } from '@mui/styles';
import CellContainer from 'components/Shop/Cell/CellContainer';
import { useStyles } from 'components/Shop/Swiper/style';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Autoplay, Navigation, Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { theme } from 'theme/index';

type Props = {
  pkeys: string[] | null,
  path: string,
};

const MySwiper: React.FC<Props> = ({ pkeys, path }) => {
  const classes = useStyles();
  const [str, setStr] = useState(classes.item);
  useEffect(() => {
    setStr(`${classes.item} ${classes.visible}`);
  }, []);
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
      className={str}
    >
      {pkeys?.map((_key: any) => (
        <SwiperSlide key={_key}>
          <CellContainer pokeid={_key} path={path} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SwiperShopComponent: React.FC<Props> = ({ pkeys, path }) => (
  <ThemeProvider theme={theme}>
    {pkeys
      && (
        <MySwiper pkeys={pkeys} path={path} />
      )}
  </ThemeProvider>

);

export default SwiperShopComponent;
