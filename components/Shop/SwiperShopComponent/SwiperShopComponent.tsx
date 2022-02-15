import CellComponent from 'components/Shop/CellComponent';
import { useCountCellSize } from 'helpers/adaptors/useCountCellSize';
import { PokemonsListResults } from 'interfaces/pokemonListType';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Autoplay, Navigation, Pagination } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  pokemons: PokemonsListResults[]
};

const SwiperShopComponent: React.FC<Props> = ({ pokemons }) => {
  const temp = useCountCellSize() * 1.2;
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
      style={{ width: temp, height: temp }}
    >
      {pokemons.map((pokemon, index: number) => (
        <SwiperSlide key={index}>
          <CellComponent pokemon={pokemon.fullInfo} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperShopComponent;
