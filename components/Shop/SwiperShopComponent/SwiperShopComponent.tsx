import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { isMobile } from 'react-device-detect';
import CellComponent from 'components/Shop/CellComponent';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import { useCountCellSize } from 'helpers/adaptors/useCountCellSize';

type Props = {
  pokemons: PokemonsListResults[]
}

const SwiperShopComponent: React.FC<Props> = ({pokemons}) => {
  let temp = useCountCellSize() * 1.2
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
      style={{width: temp, height: temp}}>
      {pokemons.map((pokemon, index: number) => (
        <SwiperSlide key={index}>
          <CellComponent pokemon={pokemon.fullInfo}/>
        </SwiperSlide>
      ))}
    </Swiper>)
}

export default SwiperShopComponent;
