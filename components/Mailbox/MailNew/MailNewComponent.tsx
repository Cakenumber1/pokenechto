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
import { getPokes } from 'helpers/';
import { countStats } from 'helpers/adaptors/countPower';
import _ from 'lodash';
import { useAuth } from 'myFirebase/AuthContext';
import { db } from 'myFirebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  usePatchSendMailMutation,
  usePostMoneyQuery,
  usePostMushroomsQuery,
} from 'store/service';

import { useStyles } from './style';

const MailNewComponent = () => {
  const classes = useStyles();
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
    await getPokes(currentUser.uid, setInvPokes);
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
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      className={classes.form}
    >
      <Box className={classes.formInner}>
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
            <AddCircleOutlineIcon className={classes.img} />
          </IconButton>
        )
          : (
            <Box sx={{ display: 'flex', p: '5px' }}>
              <img width="70px" height="70px" src={poke.img} alt="pokemon" />
              <IconButton onClick={() => setPoke(null)}>
                <CloseIcon className={classes.img} />
              </IconButton>
            </Box>
          )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          />💰
        </Box>
        <Box sx={{ pt: '10px', display: 'flex', alignItems: 'center' }}>
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
          />🍇
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
      <Box className={classes.buttons}>
        <Button onClick={handleClear} variant="contained" color="error" startIcon={<ClearIcon />}>
          Clear
        </Button>
        <Button disabled={!money || money!.count < 100 || !target} variant="contained" type="submit" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography id="modal-modal-title">
            Pick poke to transfer
          </Typography>
          {invPokes?.map((p: any) => (
            <Button
              onClick={() => { setPoke(p); setOpen(false); setValueMon(0); }}
              className={classes.pokemon}
              key={p.invId}
            >
              <img
                width="30%"
                height="100%"
                src={p.img}
                alt=""
              />
              <Box>
                <Typography id="modal-poke-name">
                  Name: {p.name}
                </Typography>
                <Typography id="modal-poke-power">
                  Power: { countStats(p).power }
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
