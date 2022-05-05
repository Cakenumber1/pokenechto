import React from 'react';

import MailComponent from '../MailComponent';
import { useStyles } from './style';

type Props = {
  children: JSX.Element
};

const MailContainer: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <MailComponent classes={classes}>
      {children}
    </MailComponent>
  );
};

export default MailContainer;
