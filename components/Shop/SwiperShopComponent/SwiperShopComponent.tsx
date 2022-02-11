import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import css from './SwiperShopComponent.module.scss'
import { isMobile } from 'react-device-detect';
import CellComponent from '../CellComponent';
import { PokemonsListResults } from '../../../interfaces/pokemonListType';

type Props = {
  pokemons: PokemonsListResults[]
}

const SwiperShopComponent: React.FC<Props> = ({pokemons}) => {
  //const isMobile = true;
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
      className={css.swiperMain}>
      {pokemons.map((pokemon, index: number) => (
        <SwiperSlide key={index} className={css.swiperSlide}>
          <CellComponent pokemon={pokemon.fullInfo}/>
        </SwiperSlide>
      ))}
    </Swiper>)
}

export default SwiperShopComponent;
