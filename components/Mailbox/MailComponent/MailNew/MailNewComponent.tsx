import {
  AddCircleOutline as AddCircleOutlineIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Help as HelpIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import {
  Box, Button, ClickAwayListener,
  IconButton, Modal,
  TextField, Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import React, { useEffect, useState } from 'react';
import {
  usePatchSendMailMutation,
  usePostMoneyQuery,
  usePostMushroomsQuery,
} from 'store/service';

// import { useStyles } from './style';

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
  // const classes = useStyles();
  const [mail, setMail] = useState('');
  const [target, setTarget] = useState('');
  const [text, setText] = useState('');
  const [valueBer, setValueBer] = useState(0);
  const [valueMon, setValueMon] = useState(0);
  const [poke, setPoke] = useState<any | null>(null);
  const [invPokes, setInvPokes] = useState<any>(null);
  const { currentUser } = useAuth()!;
  const [open, setOpen] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const min = 0;
  const { data: mushrooms } = usePostMushroomsQuery(currentUser.uid);
  const { data: money } = usePostMoneyQuery(currentUser.uid);
  const [patchSendMailMutation] = usePatchSendMailMutation();
  const [maxM, setMaxM] = useState(money?.count as number - 100);
  const maxB = mushrooms?.count as number;
  const router = useRouter();

  useEffect(
    () => (poke ? setMaxM(money?.count as number - 1100) : setMaxM(money?.count as number - 100)),
    [money?.count, poke],
  );

  const checkMail = _.debounce(async (e: string) => {
    const res = await db.collection('users')
      .where('mail', '==', e)
      .get();
    if (res.docs.length) {
      setTarget(res.docs[0].id);
    } else {
      setTarget('');
    }
  }, 2000);

  const handleMailChange = async (e: string) => {
    await setMail(String(e));
    if (e !== currentUser.email) checkMail(e);
  };

  const handleOpen = async () => {
    setOpen(true);
    await getData(currentUser.uid, setInvPokes);
  };
  const handleClear = () => {
    setPoke(null);
    setText('');
    setMail('');
    setValueMon(0);
    setValueBer(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const m = -(poke ? 1100 + 1.1 * valueMon : 100 + 1.1 * valueMon);
    patchSendMailMutation({
      from: currentUser.uid,
      fromMail: currentUser.email,
      to: target,
      toMail: mail,
      text,
      money: valueMon,
      berries: valueBer,
      poke,
    }).unwrap();
    router.push('/');
    // patchMoneyMutation({ uid: currentUser.uid, count: m }).unwrap();
    // patchMushroomsMutation({ uid: currentUser.uid, count: 1.1 * valueBer }).unwrap();
    // await sendMail(
    //   currentUser.uid,
    //   currentUser.email,
    //   target,
    //   mail,
    //   text,
    //   valueMon,
    //   valueBer,
    //   poke,
    // );
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
            error={!target}
            onChange={(event) => handleMailChange(event.target.value)}
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
            <IconButton disabled={!money || money!.count < 1100} aria-label="add pokemon" component="span" title="add pokemon" onClick={handleOpen}>
              <AddCircleOutlineIcon sx={{ width: '40px', height: '40px' }} />
            </IconButton>
          )
            : (
              <Box sx={{ display: 'flex', p: '5px' }}>
                <img width="70px" height="70px" src={poke.img} alt="pokemon" />
                <IconButton onClick={() => setPoke(null)}>
                  <CloseIcon sx={{ width: '40px', height: '40px' }} />
                </IconButton>
              </Box>
            )}
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
            Total Tax: {(valueMon ? Math.ceil(valueMon / 10) + 100 : 100) + (poke ? 1000 : 0)}💰;
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
          <Button onClick={handleClear} variant="contained" color="error" startIcon={<ClearIcon />}>
            Clear
          </Button>
          <Button disabled={!money || money!.count < 100 || !target} variant="contained" type="submit" endIcon={<SendIcon />}>
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
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
        >
          <Typography id="modal-modal-title">
            Pick poke to transfer
          </Typography>
          {invPokes?.map((p: any) => (
            <Button
              onClick={() => { setPoke(p); setOpen(false); setValueMon(0); }}
              sx={{
                width: '100%', height: '20%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '2px solid black',
              }}
              key={p.invId}
            >
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
            </Button>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};
export default MailNewComponent;
