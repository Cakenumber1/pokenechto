import { useAuth } from 'firebase/AuthContext';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';

function withoutAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { currentUser } = useAuth()!;
    const router = useRouter();

    if (currentUser) {
      router.replace('/');
      return null;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withoutAuth;
