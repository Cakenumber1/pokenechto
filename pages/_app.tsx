// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/effect-cards';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
import 'styles/globals.scss';

import { AuthProvider } from 'myFirebase/AuthContext';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </AuthProvider>
);

export default MyApp;
