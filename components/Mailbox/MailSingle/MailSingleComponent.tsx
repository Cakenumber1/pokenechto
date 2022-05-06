import { Box, Button, Typography } from '@mui/material';
import React from 'react';

import { useStyles } from './style';

type Props = {
  mail: any,
  currentUser: any,
  setMail: React.Dispatch<any>
  handleReceive: () => void,
};

const MailSingleComponent: React.FC<Props> = ({
  mail,
  currentUser,
  setMail,
  handleReceive,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.mailSingle}>
      <Box>
        <Button onClick={() => setMail(null)}>Back</Button>
      </Box>
      <Box>
        <Box>From: {mail.from === currentUser.email ? 'You' : mail.from}</Box>
        <Box>To: {mail.to === currentUser.email ? 'You' : mail.to}</Box>
        <Box>Date: {mail.date.toDate().toLocaleString()}</Box>
        <Box>Text: {mail.text}</Box>
        {mail.poke && (
        <Box>
          <img
            width="30%"
            height="100%"
            src={mail.poke.img}
            alt=""
          />
          <Typography id="modal-poke-name">
            Name: {mail.poke.name}
          </Typography>
          <Typography id="modal-poke-power">
            Power: 100
          </Typography>
        </Box>
        )}
        <Box>
          {mail.money && (
          <Box>
            {mail.money}💰
          </Box>
          )}
          {mail.berries && (
          <Box>
            {mail.berries}🍇
          </Box>
          )}
        </Box>
        {mail.to === currentUser.email && (
        <Button
          onClick={() => handleReceive()}
          disabled={('received' in mail) && (mail.poke || mail.money || mail.berries)}
        >
          Receive
        </Button>
        )}
      </Box>
    </Box>
  );
};

export default MailSingleComponent;
