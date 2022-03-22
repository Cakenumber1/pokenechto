import React from 'react';

import ShopComponent from '../ShopComponent/ShopComponent';
import { useStyles } from '../style';

const ShopContainer = () => {
  const classes = useStyles();
  return (
    <ShopComponent classes={classes} />
  );
};

export default ShopContainer;
