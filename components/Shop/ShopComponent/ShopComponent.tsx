import { Container, Rating } from '@mui/material';
import ShelfComponent from 'components/Shop/ShelfComponent';
import SwiperShopComponent from 'components/Shop/SwiperShopComponent';
import WalletComponent from 'components/WalletComponent/';
import { ActiveLink } from 'helpers/';
import { PokemonsList } from 'interfaces/pokemonListType';
import React, { useEffect } from 'react';

import { useStyles } from './style';

type Props = {
  pokemons: PokemonsList,
  onclick: () => void
};

const ShopComponent: React.FC<Props> = ({ pokemons, onclick }) => {
  const classes = useStyles();
  // Рандомайзер количества
  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      // eslint-disable-next-line no-param-reassign
      pokemons!.results[i]!.fullInfo!.amount = Math.round(Math.random());
    }
    for (let i = 6; i < pokemons.results.length; i++) {
      const temp = Math.round(Math.random() * 10);
      const temp2 = Math.round(Math.random() * 10);
      // eslint-disable-next-line no-param-reassign
      pokemons!.results[i]!.fullInfo!.limit = temp;
      // eslint-disable-next-line no-param-reassign
      pokemons!.results[i]!.fullInfo!.amount = temp - temp2 > 0 ? temp - temp2 : 0;
    }
  }, [pokemons]);

  return (
    <Container>
      <ActiveLink onclick={onclick} href="/">Back</ActiveLink>
      <WalletComponent money={100} mushrooms={2000} />
      <div className={classes.shopBody}>
        <Container className={classes.shopBodyInner} sx={{ border: 2, borderRadius: 1 }}>
          <div className={classes.shopTop}>
            <div className={classes.shopTopText}>
              <div className={classes.shopText}>Лучшее предложение</div>
              <Rating name="read-only" value={5} style={{ fontSize: '2vmax' }} readOnly />
            </div>
            <SwiperShopComponent pokemons={pokemons.results.slice(0, 3)} />
          </div>
          <div className={classes.shopShelves}>
            <div className={classes.shopShelvesText}>Juhasd</div>
            <ShelfComponent pokemons={pokemons.results.slice(3, 6)} />
          </div>
          <div className={classes.shopShelves}>
            <div className={classes.shopShelvesText}>dsasaP</div>
            <ShelfComponent pokemons={pokemons.results.slice(6, 9)} />
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default ShopComponent;
