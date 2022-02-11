import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../firebase/AuthContext';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
