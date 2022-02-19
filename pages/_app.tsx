import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { AuthProvider } from '../firebase/AuthContext';
import { store } from '../store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Provider>
  </AuthProvider>
);

export default MyApp;
