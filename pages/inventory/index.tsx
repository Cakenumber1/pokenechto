import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { InventoryLoader } from '../../components/Inventory/InventoryLoader';

export default function Inventory() {
  const router = useRouter();

  useEffect(() => {
    router.push('/inventory/1');
  }, [router]);

  return <InventoryLoader open={true} />;
}
