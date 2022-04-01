import React from 'react';

import ArenaComponent from '../ArenaComponent/ArenaComponent';
import { useStyles } from '../style';

const ArenaContainer = () => {
  const classes = useStyles();
  return (
    <ArenaComponent classes={classes} />
  );
};

export default ArenaContainer;
