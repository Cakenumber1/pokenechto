import { Badge, Box, Button } from '@mui/material';
import HomePokedexLinkComponent from 'components/Home/HomePokedexLinkComponent';
import { useStyles } from 'components/Home/style';
import Image from 'next/image';
import Link from 'next/link';
import arenaImg from 'public/arena.png';
import mailImg from 'public/mail.png';
import shopImg from 'public/shop.png';
import React from 'react';

type Props = {
  logout: any,
  newmails: number | null,
};

const HomeComponent: React.FC<Props> = ({ logout, newmails }) => {
  const classes = useStyles();

  return (
    <Box style={{ height: '100%' }}>
      <Box
        className={classes.buildings}
      >
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Box className={classes.link}>
            <Box className={classes.mailbox}>
              <Link href="/mail">
                <Badge sx={{ right: 13, top: 20 }} badgeContent={newmails} overlap="circular" color="error">
                  <Image
                    src={mailImg}
                    alt="mail"
                  />
                </Badge>
              </Link>
            </Box>
          </Box>
          <Box
            className={classes.link}
            style={{ paddingBottom: '3%', paddingTop: '15vh' }}
          >
            <Button
              onClick={logout}
              variant="contained"
              color="primary"
            >Logout
            </Button>
          </Box>
        </Box>
        <Box className={classes.link} style={{ paddingBottom: '33vh' }}>
          <Box
            className={classes.imagebox}
          >
            <Link href="/arena">
              <Image
                src={arenaImg}
                alt="arena"
                className={classes.image}
              />
            </Link>
          </Box>
        </Box>
        <Box className={classes.link} style={{ paddingBottom: '15vh' }}>
          <Box
            className={classes.imagebox}
          >
            <Link href="/shop">
              <Image
                src={shopImg}
                alt="shop"
                className={classes.image}
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <HomePokedexLinkComponent />
    </Box>
  );
};

export default HomeComponent;
