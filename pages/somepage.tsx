import type { NextPage } from 'next'
import ShopContainer from '../components/Shop/ShopComponent/ShopContainer';
import OnloadOverlayComponent from '../components/HOCs/OnloadOverlayComponent/OnloadOverlayComponent';

const Somepage: NextPage = () => {
  return (
    <OnloadOverlayComponent component={ShopContainer}/>
  )
}

export default Somepage;
