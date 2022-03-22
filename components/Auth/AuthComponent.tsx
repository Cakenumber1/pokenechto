import withoutAuth from 'components/HOCs/withoutAuthHOC';
import React, { useState } from 'react';

import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

const AuthComponent = () => {
  const [page, setPage] = useState(true);
  const handlePage = () => {
    setPage(!page);
  };

  if (page) {
    return (<LoginComponent handlePage={handlePage} />);
  }
  return (<RegisterComponent handlePage={handlePage} />);
};

export default withoutAuth(AuthComponent);
