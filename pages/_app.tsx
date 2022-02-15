import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'styles/globals.scss';

import { AuthProvider } from 'firebase/AuthContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
