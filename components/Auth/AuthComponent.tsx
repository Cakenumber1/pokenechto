import RegisterContainer from 'components/Auth/Register/RegisterContainer';
import withoutAuth from 'components/HOCs/withoutAuthHOC';
import React, { useState } from 'react';

import LoginComponent from './LoginComponent';

const AuthComponent = () => {
  const [page, setPage] = useState(true);
  const handlePage = () => {
    setPage(!page);
  };

  if (page) {
    return (<LoginComponent handlePage={handlePage} />);
  }
  return (<RegisterContainer handlePage={handlePage} />);
};

export default withoutAuth(AuthComponent);
