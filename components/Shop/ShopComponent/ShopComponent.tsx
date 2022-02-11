import { Pokemon } from '../../../interfaces';
import SwiperShopComponent from '../SwiperShopComponent';
import React, { useEffect } from 'react';
import css from './ShopComponent.module.scss'
import ShelfComponent from '../ShelfComponent/';
import { ActiveLink } from '../../../helpers/';
import WalletComponent from '../WalletComponent/';
import Portal from '../../HOCs/PortalComponent';
import { PokemonsList } from '../../../interfaces/pokemonListType';

type Props = {
  pokemons: PokemonsList,
}

const ShopComponent: React.FC<Props> = ({pokemons} ) => {

  useEffect(() => {
    for(let i = 0; i < 6; i++) {
      pokemons!.results[i]!.fullInfo!.amount = Math.round(Math.random())
    }
    for(let i = 6; i < pokemons.results.length; i++) {
      const temp = Math.round(Math.random() * 10)
      const temp2 = Math.round(Math.random() * 10)
      pokemons!.results[i]!.fullInfo!.limit = temp
      pokemons!.results[i]!.fullInfo!.amount = temp - temp2 > 0 ? temp - temp2 : 0;
    }
  },[pokemons])

  return (
    <div className={css.ShopComponent}>
      <div className={css.header}>
        <ActiveLink href={'/'}>
          <div>Back</div>
        </ActiveLink>
        <Portal>
          <WalletComponent money={100} mushrooms={2000}/>
        </Portal>
      </div>
      <div className={css.shopBuilding}>
        <div className={css.shopSale}>
          <h2 className={css.announce}>Супер<br/>предложение</h2>
          <SwiperShopComponent pokemons={pokemons.results.slice(0, 3)}/>
        </div>
        <div className={css.shelves}>
          <div className={css.shelf}>
            <h2 className={css.shelfDiscr}>Специально для вас</h2>
            <ShelfComponent pokemons={pokemons.results.slice(3, 6)}/>
          </div>
          <div className={css.shelf}>
            <h2 className={css.shelfDiscr}>Ограниченное предложение</h2>
            <div className={css.qwe}><ShelfComponent pokemons={pokemons.results.slice(6, 9)}/></div>

          </div>
        </div>
      </div>
      <div className={css.backgroundTop}/>
      <div className={css.backgroundBottom}/>
    </div>
  )
}

export default ShopComponent;
