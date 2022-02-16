import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'styles/globals.scss';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../firebase/AuthContext';
import { store } from '../store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
