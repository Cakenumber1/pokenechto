import LoginComponent from 'components/Auth/Login/LoginComponent';
import { useAuth } from 'myFirebase/AuthContext';
import React, { useState } from 'react';

import { useStyles } from '../style';

type Props = {
  handlePage: () => void,
};

const LoginContainer: React.FC<Props> = ({ handlePage }) => {
  const classes = useStyles();
  const [error, setError] = useState<any>();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth()!;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(mail, pass)
      .catch((e: any) => {
        console.log(e);
        setError(e);
        setTimeout(() => {
          setError(null);
        }, 12000);
      });
  };
  return (
    <LoginComponent
      handlePage={handlePage}
      classes={classes}
      handleSubmit={handleSubmit}
      mail={mail}
      setMail={setMail}
      pass={pass}
      setPass={setPass}
      error={error}
    />
  );
};
export default LoginContainer;
