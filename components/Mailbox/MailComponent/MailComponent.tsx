import {
  Box, Container,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  classes: ClassNameMap,
  children: JSX.Element,
};

type Props2 = {
  classes: ClassNameMap,
  link: string,
  name: string,
};

const MailButton: React.FC<Props2> = ({ classes, link, name }) => {
  const { pathname: path } = useRouter();
  const linkStyle = clsx({
    [classes.button]: true,
    [classes.active]: path === link,
  });
  return (
    <Link href={link} passHref>
      <button type="button" className={linkStyle}>
        {name}
      </button>
    </Link>
  );
};

const MailComponent: React.FC<Props> = ({ classes, children }) => (
  <Container className={classes.mailFull}>
    <Box className={classes.buttons}>
      <MailButton classes={classes} link="/mail" name="New" />
      <MailButton classes={classes} link="/mail/history" name="History" />
      <MailButton classes={classes} link="/mail/new" name="Send" />
    </Box>
    <Box className={classes.mailInner}>
      {children}
    </Box>
  </Container>
);

export default MailComponent;
