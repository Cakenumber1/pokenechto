import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { InventoryContainer } from 'components/Inventory/InventoryContainer';
import { naturalNumberPattern } from 'helpers/inventoryHelpers';
import { InventoryLoader } from 'components/Inventory/InventoryLoader';

export default function InventoryByPage() {
  const router = useRouter();

  if (router.query.page === undefined)
    return <InventoryLoader open={router.query.page === undefined} />;

  const pageQuery = Number(router.query.page as string);
  const isBadRequest = !naturalNumberPattern.test(router.query.page as string);

  if (isBadRequest) return <Error statusCode={400} />;

  return <InventoryContainer pageQuery={pageQuery} />;
}
