import FrameComponent from 'components/FrameComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import { InventoryContainer } from 'components/Inventory/InventoryContainer';
import { naturalNumberPattern } from 'helpers/inventoryHelpers';
import Error from 'next/error';
import { useRouter } from 'next/router';

const InventoryByPage = () => {
  const router = useRouter();
  const isBadRequest = router.query.page && !naturalNumberPattern.test(router.query.page as string);

  if (isBadRequest) return <Error statusCode={400} />;

  const pageQuery = router.query.page ? Number(router.query.page) : 1;
  return (
    <FrameComponent>
      <InventoryContainer pageQuery={pageQuery} />
    </FrameComponent>
  );
};

export default withAuth(InventoryByPage);
