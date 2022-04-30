import {
  AddCircleOutline as AddCircleOutlineIcon,
  Clear as ClearIcon,
  Help as HelpIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import {
  Box, Button, ClickAwayListener,
  IconButton, Modal,
  TextField, Tooltip,
  Typography,
} from '@mui/material';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import React, { useState } from 'react';
import { usePostMoneyQuery, usePostMushroomsQuery } from 'store/service';

import { useStyles } from './style';

const getData = async (uid: string, setPokes: React.Dispatch<any>) => {
  const ans: string[] = [];
  let invId = '';
  const res = await db.collection('users').doc(uid)
    .get();
  if (res.exists) {
    invId = res.data().mainPoke.invId;
  }
  await db
    .collection('users')
    .doc(uid)
    .collection('inventory')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        if (doc.id !== invId) {
          ans.push({ ...doc.data(), invId: doc.id });
        }
      });
    });
  if (ans && ans.length) {
    setPokes(ans);
  }
};

const MailNewComponent = () => {
  const classes = useStyles();
  const [mail, setMail] = useState('');
  const [text, setText] = useState('');
  const [valueBer, setValueBer] = useState(0);
  const [valueMon, setValueMon] = useState(0);
  const [poke, setPoke] = useState(null);
  const [invPokes, setInvPokes] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth()!;
  const [open, setOpen] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const min = 0;
  const { data: mushrooms } = usePostMushroomsQuery(currentUser.uid);
  const { data: money } = usePostMoneyQuery(currentUser.uid);
  const maxM = money?.count as number;
  const maxB = mushrooms?.count as number;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(mail, text);
  };
  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    await getData(currentUser.uid, setInvPokes);
    console.log(invPokes);
    setLoading(false);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        height: '97.5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '95%', paddingLeft: '2.5%' }}>
        <Typography component="h1" variant="h5">
          New Mail
        </Typography>
        <Box sx={{ mt: 1, height: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={mail}
            onChange={(event) => setMail(String(event.target.value))}
          />
          <TextField
            margin="normal"
            label="Text"
            id="text"
            fullWidth
            multiline
            maxRows={3}
            value={text}
            onChange={(event) => setText(String(event.target.value))}
            inputProps={{ maxLength: 100 }}
          />
          <Box>{text.length}/100</Box>
          {!poke ? (
            <IconButton aria-label="add pokemon" component="span" title="add pokemon" onClick={handleOpen}>
              <AddCircleOutlineIcon sx={{ width: '40px', height: '40px' }} />
            </IconButton>
          ) : <div style={{ width: '40px', height: '40px', background: 'red' }}>123</div>}
          <Box>
            <TextField
              type="number"
              inputProps={{ min, maxM }}
              value={valueMon}
              onChange={(e) => {
                let value = parseInt(e.target.value, 10);
                if (value > maxM) value = maxM;
                if (value < min) value = min;
                setValueMon(value);
              }}
            />
          </Box>
          <Box sx={{ pt: '10px' }}>
            <TextField
              type="number"
              inputProps={{ min, maxB }}
              value={valueBer}
              onChange={(e) => {
                let value = parseInt(e.target.value, 10);
                if (value > maxB) value = maxB;
                if (value < min) value = min;
                setValueBer(value);
              }}
            />
          </Box>
          <Box>
            Total Tax: {valueMon ? Math.ceil(valueMon / 10) + 100 : 100}💰;
            {valueBer ? Math.ceil(valueBer / 10) : 0 }🍇
            <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setOpenTooltip(false)}
                open={openTooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                arrow
                title={(
                  < >
                    <Typography color="inherit">Tax formula: 100 for mail</Typography>
                    <Typography color="inherit">+ 10% for transfer</Typography>
                    <Typography color="inherit">+ 1000 for poke</Typography>
                  </>
                )}
              >
                <IconButton onClick={() => setOpenTooltip(true)}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>

          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
        >
          <Button variant="contained" color="error" startIcon={<ClearIcon />}>
            Clear
          </Button>
          <Button variant="contained" type="submit" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '70%',
          minWidth: '300px',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
        }}
        >
          <Typography id="modal-modal-title">
            Pick poke to transfer
          </Typography>
          {invPokes?.map((p: any) => (
            <Box sx={{ width: '100%', height: '20%', background: 'red', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} key={p.invId}>
              <img
                width="30%"
                height="100%"
                src={p.img}
                alt=""
              />
              <Box>
                <Typography id="modal-modal-title">
                  Name: {p.name}
                </Typography>
                <Typography id="modal-modal-title">
                  Power: 100
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};
export default MailNewComponent;
