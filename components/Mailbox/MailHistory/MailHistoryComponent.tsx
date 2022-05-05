import {
  Inventory as InventoryIcon,
  Textsms as TextsmsIcon,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import LoaderComponent from 'components/LoaderComponent';
import MailSingleComponent from 'components/Mailbox/MailSingle';
import { getNewMails } from 'helpers/';
import { useAuth } from 'myFirebase/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  usePatchReceiveMailMutation,
} from 'store/service';

import { useStyles } from './style';

const MailHistoryComponent = () => {
  const classes = useStyles();
  const { currentUser } = useAuth()!;
  const [mail, setMail] = useState<any>(null);
  const [newMails, setNewMails] = useState<any>();
  const [patchReceiveMailMutation] = usePatchReceiveMailMutation();
  const router = useRouter();

  useEffect(() => {
    getNewMails(currentUser.uid, setNewMails);
  }, [currentUser.uid]);

  const handleReceive = () => {
    patchReceiveMailMutation({
      ...mail,
      uid: currentUser.uid,
    });
    router.push('/');
  };

  const handleClick = async (m: any) => {
    setMail(m);
  };

  if (newMails === null) return <LoaderComponent />;

  if (mail) {
    return (
      <MailSingleComponent
        mail={mail}
        currentUser={currentUser}
        setMail={setMail}
        handleReceive={handleReceive}
      />
    );
  }

  return (
    <Box className={classes.mails}>
      {newMails && newMails.length
        ? (
          <>
            {newMails.map((m: any) => (
              <Button
                key={m.mailId}
                className={classes.mailButton}
                onClick={() => handleClick(m)}
              >
                <Box>
                  <Box>From: {m.from === currentUser.email ? 'You' : m.from}</Box>
                  <Box>To: {m.to === currentUser.email ? 'You' : m.to}</Box>
                  <Box className={classes.mailButtonInner}>
                    {m.text ? <TextsmsIcon sx={{ color: 'black' }} /> : <Box />}
                    {m.money || m.berries || m.poke ? <InventoryIcon sx={{ color: 'black' }} /> : <Box />}
                  </Box>
                </Box>
                <Box>{m.date.toDate().toLocaleString()}</Box>
              </Button>
            ))}
          </>
        ) : <Box className={classes.mailsNone}>No recent messages</Box>}
    </Box>
  );
};

export default MailHistoryComponent;
