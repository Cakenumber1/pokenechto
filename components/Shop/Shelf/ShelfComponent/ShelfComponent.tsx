import { Stack } from '@mui/material';
import { ClassNameMap, ThemeProvider } from '@mui/styles';
import CellContainer from 'components/Shop/Cell/CellContainer';
import { useStylesItem } from 'components/Shop/Shelf/style';
import React from 'react';
import { theme } from 'theme/index';

type Props = {
  classes: ClassNameMap,
  pkeys: any,
};

type ItemType = {
  _key: any,
};

const ItemComp = ({ _key }: ItemType) => {
  const classesItem = useStylesItem();
  return (
    <div key={_key} className={classesItem.item}>
      <CellContainer pokeid={_key} />
    </div>
  );
};

const ShelfComponent: React.FC<Props> = ({ classes, pkeys }) => {
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
