import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useRouter} from 'next/router';
import Error from 'next/error';
import {InventoryContainer} from '../../components/Inventory/InventoryContainer';

const naturalNumberPattern = /^[1-9]{1}[0-9]{0,}$/;

export default function InventoryByPage() {
  const router = useRouter();
  const pageQuery = Number(router.query.page as string);
  const isBadRequest = !naturalNumberPattern.test(router.query.page as string);

  if (isBadRequest) return <Error statusCode={400} />;

  return <InventoryContainer pageQuery={pageQuery} />;
}
