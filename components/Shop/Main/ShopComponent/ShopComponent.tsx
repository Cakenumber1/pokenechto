import {
  Box, Rating,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import ShelfContainer from 'components/Shop/Shelf/ShelfContainer';
import SwiperShopContainer from 'components/Shop/Swiper/SwiperShopContainer';
import React from 'react';

type Props = {
  classes: ClassNameMap,
};

const ShopComponent: React.FC<Props> = ({ classes }) => (
  <Box className={classes.shopBody}>
    <Box className={classes.shopTop}>
      <Box className={classes.shopTopText}>
        <Box className={classes.shopText}>Лучшее предложение</Box>
        <Rating name="read-only" value={5} style={{ fontSize: '2vmax' }} readOnly />
      </Box>
      <SwiperShopContainer />
    </Box>
    <Box className={classes.shopShelves}>
      <Box className={classes.shopShelvesText}>Заявление1</Box>
      <ShelfContainer shelfn="sale" />
    </Box>
    <Box className={classes.shopShelves}>
      <Box className={classes.shopShelvesText}>Заявление2</Box>
      <ShelfContainer shelfn="shelf" />
    </Box>
  </Box>
);

export default ShopComponent;
