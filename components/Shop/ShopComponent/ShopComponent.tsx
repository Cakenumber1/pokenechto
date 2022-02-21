import { Container, Rating } from '@mui/material';
import SwiperShopComponent from 'components/Shop/SwiperShopComponent';
import WalletComponent from 'components/WalletComponent/';
import ShelfComponent from 'components/Shop/ShelfComponent';
import { ActiveLink } from 'helpers/';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPokemons } from 'store/shop/shopSlice';

import { useStyles } from './style';
import { selectWallet } from 'store/wallet/walletSlice';

type Props = {
  onclick: () => void
};

const ShopComponent: React.FC<Props> = ({ onclick }) => {
  const data = useSelector(selectPokemons);
  const {money, mushrooms} = useSelector(selectWallet);
  console.log(data);
  const classes = useStyles();
  return (
    <Container>
      <ActiveLink onclick={onclick} href="/">Back</ActiveLink>
      <WalletComponent money={money} mushrooms={mushrooms} />
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
            <div className={classes.shopShelvesText}>Juhasd</div>
            <ShelfComponent shelfn={1} />
          </div>
          <div className={classes.shopShelves}>
            <div className={classes.shopShelvesText}>dsasaP</div>
            <ShelfComponent shelfn={2} />
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default ShopComponent;
