import { InventoryLoader } from 'components/Inventory/InventoryLoader';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Inventory = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/inventory/1');
  }, [router]);

  return <InventoryLoader open />;
};

export default Inventory;
