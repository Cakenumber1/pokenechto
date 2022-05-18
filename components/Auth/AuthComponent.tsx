import LoginContainer from 'components/Auth/Login/LoginContainer';
import RegisterContainer from 'components/Auth/Register/RegisterContainer';
import withoutAuth from 'components/HOCs/withoutAuthHOC';
import React, { useState } from 'react';

const AuthComponent = () => {
  const [page, setPage] = useState(true);
  const handlePage = () => {
    setPage(!page);
  };

  if (page) {
    return (<LoginContainer handlePage={handlePage} />);
  }
  return (<RegisterContainer handlePage={handlePage} />);
};

export default withoutAuth(AuthComponent);
