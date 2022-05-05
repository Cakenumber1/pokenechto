import {
  CurrencyExchange as RefreshIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
} from '@mui/icons-material';
import {
  Box, Button, IconButton,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import { getBackgroundColor } from 'helpers';
import { countStats } from 'helpers/adaptors/countPower';
import { getData } from 'helpers/arena/getData';
import { estimatePower } from 'helpers/arena/powers';
import { Opponent } from 'interfaces';
import { useAuth } from 'myFirebase/AuthContext';
import React, { useEffect, useState } from 'react';

type Props = {
  classes: ClassNameMap,
};

const ArenaComponent: React.FC<Props> = ({ classes }) => {
  const [opponents, setOpponents] = useState<Opponent[]>();
  const [me, setMe] = useState<any>(null);
  const [opponent, setOpponent] = useState<Opponent | null>(null);
  const { currentUser } = useAuth()!;
  useEffect(() => {
    getData(currentUser.uid, setOpponents, setMe);
  }, [currentUser.uid]);

  if (opponent) {
    return (
      <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Box sx={{
          width: '100%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <Button sx={{
            background: 'yellow',
            borderRadius: '50%',
            textAlign: 'center',
            '&:hover': {
              backgroundColor: 'orange',
            },
          }}
          >
            Fight
          </Button>
          <Button variant="contained" color="error" sx={{ position: 'absolute', right: '5%' }} onClick={() => setOpponent(null)}>Retreat</Button>
        </Box>
        <Box sx={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
        >
          <Box sx={{
            position: 'absolute',
            width: '93%',
            height: '84.5%',
            background: 'linear-gradient(-30deg, transparent 50%, lightblue 0)',
            overflowY: 'hidden',
            color: 'black',
            fontWeight: 'bold',
          }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>{me.name}</Box>
              <Box>{countStats(me.mainPoke).power}</Box>
              <Box>
                {me.mainPoke.types.map((type: string) => (
                  <Box key={me.mainPoke.name + type}>{type}</Box>
                ))}
              </Box>
              <Box sx={{
                position: 'absolute',
                objectFit: 'fill',
                display: 'flex',
                width: '100%',
                height: '50%',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              >
                <img style={{ objectFit: 'fill', aspectRatio: '1/1' }} width="70%" height="70%" src={me.mainPoke.img} alt="123" />
              </Box>
            </Box>
          </Box>
          <Box sx={{
            position: 'absolute',
            width: '93%',
            height: '84.5%',
            background: 'linear-gradient(-210deg, transparent 50%, red 0)',
            color: 'white',
            fontWeight: 'bold',
          }}
          >
            <Box sx={{
              display: 'flex', flexDirection: 'column-reverse', textAlign: 'right', height: '100%',
            }}
            >
              <Box>
                {opponent.poke.types.map((type: string) => (
                  <Box key={opponent.poke.name + type}>{type}</Box>
                ))}
              </Box>
              <Box>{countStats(opponent.poke).power}</Box>
              <Box>{opponent.name}</Box>
              <Box sx={{
                position: 'absolute',
                objectFit: 'fill',
                display: 'flex',
                width: '100%',
                height: '50%',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              >
                <img style={{ objectFit: 'fill', aspectRatio: '1/1' }} width="70%" height="70%" src={opponent.poke.img} alt="123" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box className={classes.arena}>
      <Box sx={{
        width: '100%',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
      >
        <Box>Rating: {me?.rating}</Box>
        <IconButton onClick={() => getData(currentUser.uid, setOpponents, setMe, opponents)}>
          <RefreshIcon />
        </IconButton>
      </Box>
      {opponents && opponents.map((e) => (
        <Button
          onClick={() => setOpponent(e)}
          key={e.name + e.poke.exp}
          sx={{
            width: '95%',
            height: '30%',
            border: '2px solid black',
            boxShadow: '0px 5px 10px 2px rgba(0, 0, 0, 0.2) inset',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textTransform: 'none',
            color: 'white',
          }}
        >
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          >
            <Box>
              <Box>{e.name}</Box>
              {e.mail && <Box>Mail: {e.mail}</Box>}
            </Box>
            <Box>
              {e.mail ? <PersonIcon /> : <BotIcon />}
            </Box>
          </Box>
          <Box sx={{
            display: 'flex', width: '100%', height: '100%', justifyContent: 'space-around',
          }}
          >
            <Box sx={{
              height: '75%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            >
              <Box>{e.poke.name.toUpperCase()}</Box>
              <Box sx={{ whiteSpace: 'nowrap' }}>Power: {countStats(e.poke).power}</Box>
              <Box>
                {e.poke.types.map((type) => (
                  <Box sx={{ color: getBackgroundColor([type]) }} key={e.name + type}>{type}</Box>
                ))}
              </Box>
              <Box sx={{ color: estimatePower(me.mainPoke!, e.poke).color, whiteSpace: 'nowrap' }}>
                {estimatePower(me.mainPoke!, e.poke).result}
              </Box>
            </Box>
            <Box sx={{ objectFit: 'fill', aspectRatio: '1/1' }}>
              <img style={{ objectFit: 'fill', aspectRatio: '1/1' }} width="80%" height="80%" src={e.poke.img} alt="123" />
            </Box>
          </Box>
        </Button>
      ))}
    </Box>
  );
};

export default ArenaComponent;
