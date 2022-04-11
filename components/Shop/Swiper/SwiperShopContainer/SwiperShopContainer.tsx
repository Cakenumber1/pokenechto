import SwiperShopComponent from 'components/Shop/Swiper/SwiperShopComponent';
import { useAuth } from 'myFirebase/AuthContext';
import { usePostUserShopPokemonIDsQuery } from 'store/service';

const SwiperShopContainer = () => {
  const { currentUser } = useAuth()!;
  const { data: res } = usePostUserShopPokemonIDsQuery(currentUser.uid);
  const path = `/users/${currentUser.uid}/personalShop`;
  const pkeys = res?.pids || null;
  return (
    <SwiperShopComponent pkeys={pkeys} path={path} />
  );
};

export default SwiperShopContainer;
