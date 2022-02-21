// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';

import { InventoryContainer } from 'components/Inventory/InventoryContainer';
import { InventoryLoader } from 'components/Inventory/InventoryLoader';
import { naturalNumberPattern } from 'helpers/inventoryHelpers';
import Error from 'next/error';
import { useRouter } from 'next/router';

const InventoryByPage = () => {
  const router = useRouter();

  if (router.query.page === undefined) {
    return <InventoryLoader open />;
  }

  const pageQuery = Number(router.query.page as string);
  const isBadRequest = !naturalNumberPattern.test(router.query.page as string);

  if (isBadRequest) return <Error statusCode={400} />;

  return <InventoryContainer pageQuery={pageQuery} />;
};

export default InventoryByPage;
