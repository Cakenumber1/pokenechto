import { Button, Grid, Link } from '@mui/material';
import WalletComponent from 'components/WalletComponent';
import { ActiveLink } from 'helpers';
import React from 'react';

type Props = {
  onclick: () => void
};

const HomeComponent: React.FC<Props> = ({ onclick }) => (
  <div style={{ height: '100%' }}>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <Grid item xs={1}>
        <ActiveLink onclick={onclick} href="/pokedex">
          <Button
            variant="contained"
            color="primary"
          >Pokedex
          </Button>
        </ActiveLink>
      </Grid>
      <Grid item xs={1}>
        <Link href="/pokedex/bestiary">
          <Button
            variant="contained"
            color="warning"
          >Bestiary std link
          </Button>
        </Link>
      </Grid>
      <Grid item xs={1}>
        <Link href="/pokedex/inventory">
          <Button
            variant="contained"
            color="warning"
          >Inventory std link
          </Button>
        </Link>
      </Grid>
      <Grid item xs={1}>
        <ActiveLink onclick={onclick} href="/shop">
          <Button
            variant="contained"
            color="success"
          >Shop
          </Button>
        </ActiveLink>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="success"
          disabled
        >Arena
        </Button>
      </Grid>
    </Grid>
    <WalletComponent />
  </div>
);

export default HomeComponent;
