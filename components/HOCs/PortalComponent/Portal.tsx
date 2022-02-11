import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react';

const Portal = ({children}: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children,
      document.querySelector('#__next')!)
    : null
}

export default Portal;
