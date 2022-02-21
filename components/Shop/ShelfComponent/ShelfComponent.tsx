import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
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
  const pkeys = useSelector(pokemonsIDsSelector).slice(3 * shelfn, 2 * 3 * shelfn);
  const classes = useStylesStack();
  return (
    <ThemeProvider theme={theme}>
      <Stack className={classes.stack} direction="row">
        {pkeys.map((_key: any) => (
          <ItemComp _key={_key} />
        ))}
      </Stack>
    </ThemeProvider>
  );
};

export default ShelfComponent;
