import {
  Error as ErrorIcon,
  Inventory as InventoryIcon,
  Textsms as TextsmsIcon,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import LoaderComponent from 'components/LoaderComponent';
import MailSingleComponent from 'components/Mailbox/MailSingle';
import { getUnreadMails } from 'helpers/';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { usePatchReceiveMailMutation } from 'store/service';

import { useStyles } from './style';

const MailHomeComponent = () => {
  const classes = useStyles();
  const { currentUser } = useAuth()!;
  const [mail, setMail] = useState<any>(null);
  const [newMails, setNewMails] = useState<any>();
  const [patchReceiveMailMutation] = usePatchReceiveMailMutation();
  const router = useRouter();

  useEffect(() => {
    getUnreadMails(currentUser.uid, setNewMails);
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
    await db.collection('users').doc(currentUser.uid).collection('mails').doc(m.mailId)
      .update({
        unread: false,
      });
    setNewMails(newMails.filter((item: any) => item !== m));
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
                  <Box>From: {m.from}</Box>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                    {m.text ? <TextsmsIcon sx={{ color: 'black' }} /> : <Box />}
                    {m.money || m.berries || m.poke ? <InventoryIcon sx={{ color: 'black' }} /> : <Box />}
                  </Box>
                </Box>
                <Box>{m.date.toDate().toLocaleString()}</Box>
                <ErrorIcon color="error" />
              </Button>
            ))}
          </>
        ) : <Box sx={{ textAlign: 'center' }}>No unread messages</Box>}
    </Box>
  );
};

export default MailHomeComponent;
