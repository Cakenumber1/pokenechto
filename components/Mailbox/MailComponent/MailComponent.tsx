import {
  Container,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import React from 'react';

type Props = {
  classes: ClassNameMap,
};

const MailComponent: React.FC<Props> = ({ classes }) => (
  <Container className={classes.qwe}>
    <div>123</div>
  </Container>
);

export default MailComponent;
