import SwiperShopComponent from 'components/Shop/Swiper/SwiperShopComponent';
import { useGetShopPokemonIDsQuery } from 'store/service';

const SwiperShopContainer = () => {
  const { data: pokeIDs } = useGetShopPokemonIDsQuery();
  const pkeys = pokeIDs ? pokeIDs!.slice(0, 3) : null;
  return (
    <SwiperShopComponent pkeys={pkeys} />
  );
};

export default SwiperShopContainer;
