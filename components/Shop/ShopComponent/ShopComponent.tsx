import SwiperShopComponent from '../SwiperShopComponent';
import React, { useEffect } from 'react';
import ShelfComponent from '../ShelfComponent/';
import { ActiveLink } from '../../../helpers/';
import WalletComponent from '../WalletComponent/';
import { PokemonsList } from '../../../interfaces/pokemonListType';
import { Container, Rating } from '@mui/material';
import { useStyles } from './style';

type Props = {
  pokemons: PokemonsList,
}

const ShopComponent: React.FC<Props> = ({pokemons}) => {

  const classes = useStyles();
  //Рандомайзер количества
  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      pokemons!.results[i]!.fullInfo!.amount = Math.round(Math.random())
    }
    for (let i = 6; i < pokemons.results.length; i++) {
      const temp = Math.round(Math.random() * 10)
      const temp2 = Math.round(Math.random() * 10)
      pokemons!.results[i]!.fullInfo!.limit = temp
      pokemons!.results[i]!.fullInfo!.amount = temp - temp2 > 0 ? temp - temp2 : 0;
    }
  }, [pokemons])

  return (
    <Container>
      <ActiveLink href={'/'}>
        <div>Back</div>
      </ActiveLink>
      <WalletComponent money={100} mushrooms={2000}/>
      <div className={classes.shopBody}>
        <div className={classes.shopTop}>
          <div className={classes.shopTopText}><h3 style={{textAlign: 'center', margin: 0}}>Лучшее предложение</h3>
            <Rating name="read-only" value={5} size="large" readOnly/>
          </div>
          <SwiperShopComponent pokemons={pokemons.results.slice(0, 3)}/>
        </div>
        <div className={classes.shopShelves}>
          <div className={classes.shopShelvesText}>Juhasd</div>
          <ShelfComponent pokemons={pokemons.results.slice(6, 9)}/>
        </div>
        <div className={classes.shopShelves}>
          <div className={classes.shopShelvesText}>dsasaP</div>
          <ShelfComponent pokemons={pokemons.results.slice(6, 9)}/>
        </div>
      </div>
    </Container>
  )
}

export default ShopComponent;
