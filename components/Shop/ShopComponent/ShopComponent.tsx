import { Button, Container, Rating } from '@mui/material';
import ShelfComponent from 'components/Shop/ShelfComponent';
import SwiperShopComponent from 'components/Shop/SwiperShopComponent';
import WalletComponent from 'components/WalletComponent/';
import { ActiveLink } from 'helpers/';
import React from 'react';

import { useStyles } from './style';

type Props = {
  onclick: () => void
};

const ShopComponent: React.FC<Props> = ({ onclick }) => {
  const classes = useStyles();
  return (
    <Container>
      <ActiveLink onclick={onclick} href="/">
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </ActiveLink>
      <WalletComponent />
      <div className={classes.shopBody}>
        <Container className={classes.shopBodyInner} sx={{ border: 2, borderRadius: 1 }}>
          <div className={classes.shopTop}>
            <div className={classes.shopTopText}>
              <div className={classes.shopText}>Лучшее предложение</div>
              <Rating name="read-only" value={5} style={{ fontSize: '2vmax' }} readOnly />
            </div>
            <SwiperShopComponent />
          </div>
          <div className={classes.shopShelves}>
            <div className={classes.shopShelvesText}>Заявление1</div>
            <ShelfComponent shelfn={1} />
          </div>
          <div className={classes.shopShelves}>
            <div className={classes.shopShelvesText}>Заявление2</div>
            <ShelfComponent shelfn={2} />
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default ShopComponent;
