import React from 'react';

import MailComponent from '../MailComponent';
import { useStyles } from '../style';

const MailContainer = () => {
  const classes = useStyles();
  return (
    <MailComponent classes={classes} />
  );
};

export default MailContainer;
