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
