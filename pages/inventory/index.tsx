import {useRouter} from 'next/router';
import {useEffect} from 'react';

export default function Inventory() {
  const router = useRouter();

  useEffect(() => {
    router.push('/inventory/1');
  }, [router]);

  return null;
}
