import {
  Inventory as InventoryIcon,
  Textsms as TextsmsIcon,
} from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import LoaderComponent from 'components/LoaderComponent';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import React, { useEffect, useState } from 'react';
import {
  usePatchReceiveMailMutation,
} from 'store/service';
import { useRouter } from 'next/router';

const getData = async (uid: string, setMails: React.Dispatch<any>) => {
  const ans: string[] = [];
  await db
    .collection('users')
    .doc(uid)
    .collection('mails')
    .orderBy('date', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        ans.push({ mailId: doc.id, ...doc.data() });
      });
    });
  if (ans && ans.length) {
    setMails(ans);
  }
};

const MailHistoryComponent = () => {
  const { currentUser } = useAuth()!;
  const [mail, setMail] = useState<any>(null);
  const [newMails, setNewMails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [patchReceiveMailMutation] = usePatchReceiveMailMutation();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getData(currentUser.uid, setNewMails).then(() => setLoading(false));
  }, [currentUser.uid]);

  const handleReceive = () => {
    patchReceiveMailMutation({
      ...mail,
      uid: currentUser.uid,
    });
    router.push('/');
  };

  if (loading) return <LoaderComponent />;
  if (mail) {
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
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
            <Typography id="modal-modal-title">
              Name: {mail.poke.name}
            </Typography>
            <Typography id="modal-modal-title">
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
          <Button
            onClick={() => handleReceive()}
            disabled={('received' in mail) && (mail.poke || mail.money || mail.berries)}
          >
            Receive
          </Button>
        </Box>
      </Box>
    );
  }
  const handleClick = async (m: any) => {
    setMail(m);
  };

  return (
    <Box sx={{
      width: '100%', height: '100%', p: '5px', overflowY: 'auto',
    }}
    >
      {newMails && newMails.length
        ? (
          <>
            {newMails.map((m: any) => (
              <Button
                key={m.mailId}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  border: '2px solid black',
                  mt: '5px',
                  color: 'black',
                  textTransform: 'none',
                }}
                onClick={() => handleClick(m)}
                className="mail"
              >
                <Box>
                  <Box>From: {m.from === currentUser.email ? 'You' : m.from}</Box>
                  <Box>To: {m.to === currentUser.email ? 'You' : m.to}</Box>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                    {m.text ? <TextsmsIcon sx={{ color: 'black' }} /> : <Box />}
                    {m.money || m.berries || m.poke ? <InventoryIcon sx={{ color: 'black' }} /> : <Box />}
                  </Box>
                </Box>
                <Box>{m.date.toDate().toLocaleString()}</Box>
              </Button>
            ))}
          </>
        ) : <Box sx={{ height: '100%', textAlign: 'center', top: '50%' }}>No recent messages</Box>}
    </Box>
  );
};

export default MailHistoryComponent;
