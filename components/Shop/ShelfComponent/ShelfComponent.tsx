import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import React from 'react';
import { useGetShopPokemonIDsQuery } from 'store/service';
import { pokemonsIDsSelector } from 'store/shop/shopSlice';
import { theme } from 'theme/index';

import CellComponent from '../CellComponent';
import { useStylesItem, useStylesStack } from './style';

type Props = {
  shelfn: number,
};
type ItemType = {
  _key: any,
};
const ItemComp = ({ _key }: ItemType) => {
  const classes = useStylesItem();
  return (
    <div key={_key} className={classes.item}>
      <CellComponent pokeid={_key} />
    </div>
  );
};

const ShelfComponent: React.FC<Props> = ({ shelfn }) => {
  const { data: pokeIDs } = useGetShopPokemonIDsQuery();
  let pkeys;
  pokeIDs ? pkeys = pokeIDs!.slice(3 * shelfn, 2 * 3 * shelfn) : pkeys = null;
  const classes = useStylesStack();
  if (pkeys) {
    return (
      <ThemeProvider theme={theme}>
        <Stack className={classes.stack} direction="row">
          {pkeys.map((_key: any) => (
            <ItemComp _key={_key} />
          ))}
        </Stack>
      </ThemeProvider>
    );
  }
  return <div />;
};

export default ShelfComponent;
