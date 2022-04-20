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
  <Container className={classes.fullMail}>
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    >
      <MailButton classes={classes} link="/mail" name="Main" />
      <MailButton classes={classes} link="/mail/history" name="History" />
      <MailButton classes={classes} link="/mail/new" name="New message" />
    </Box>
    <Box style={{
      padding: 0, margin: 0, width: '100%', height: '95%', background: 'darkgray',
    }}
    >
      {children}
    </Box>
  </Container>
);

export default MailComponent;
