import {
  Avatar, Box, LinearProgress,
  Typography,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import FrameComponent from 'components/FrameComponent';
import LoaderComponent from 'components/LoaderComponent';
import ProfileMainPokeComponent from 'components/Pokedex/ProfileComponent/ProfileMainPokeComponent';
import { stringAvatar } from 'helpers';
import { UserType } from 'interfaces/userType';
import React from 'react';

type Props = {
  classes: ClassNameMap,
  who: UserType | undefined,
};

const ProfileComponent: React.FC<Props> = ({ classes, who }) => (
  <FrameComponent>
    {who ? (
      <Box className={classes.main}>
        <Box className={classes.mainInner}>
          <Typography variant="h5">Main info</Typography>
          <Box className="User">
            <Avatar {...stringAvatar(who.name)} />
            <Typography>{who.name}</Typography>
            <Typography>{who.mail}</Typography>
          </Box>
          <Typography variant="h5">PvP Stats</Typography>
          <Box className="Pvp Stats">
            <Box style={{ display: 'flex' }}>
              <Typography>Rating: </Typography>
              <Typography>&nbsp;</Typography>
              <Typography>{` ${who.rating}`}</Typography>
            </Box>
            <Box style={{ display: 'flex' }}>
              <Typography>Pvp Fights: </Typography>
              <Typography>&nbsp;</Typography>
              <Typography> {who.pvpTotal}</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ inlineSize: 'min-content', whiteSpace: 'nowrap' }}>Win rate: </Typography>
              <Box sx={{ width: '70%' }}>
                <LinearProgress
                  variant="determinate"
                  value={(who.pvpWin / who.pvpTotal) || 0}
                  sx={{ backgroundColor: 'red' }}
                />
              </Box>
            </Box>
          </Box>
          <Typography variant="h5">Main Pokemon</Typography>
          <ProfileMainPokeComponent poke={who.mainPoke} />
          <Typography variant="h5">Collection</Typography>
          <Box className="Collection">
            <Box style={{ display: 'flex' }}>
              <Typography>Pokemons found:</Typography>
              <Typography>&nbsp;</Typography>
              <Typography> {who.bestiary.length}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    ) : <LoaderComponent />}
  </FrameComponent>
);

export default ProfileComponent;
