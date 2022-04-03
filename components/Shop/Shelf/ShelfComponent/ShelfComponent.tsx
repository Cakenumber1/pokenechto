import { Stack } from '@mui/material';
import { ClassNameMap, ThemeProvider } from '@mui/styles';
import CellContainer from 'components/Shop/Cell/CellContainer';
import { useStylesItem } from 'components/Shop/Shelf/style';
import React from 'react';
import { theme } from 'theme/index';

type Props = {
  classes: ClassNameMap,
  pkeys: any,
  path: string
};

type ItemType = {
  _key: any,
  path: string
};

const ItemComp = ({ _key, path }: ItemType) => {
  const classesItem = useStylesItem();
  return (
    <div key={_key} className={classesItem.item}>
      <CellContainer pokeid={_key} path={path} />
    </div>
  );
};

const ShelfComponent: React.FC<Props> = ({ classes, pkeys, path }) => {
  if (pkeys) {
    return (
      <ThemeProvider theme={theme}>
        <Stack className={classes.stack} direction="row">
          {pkeys?.map((_key: any) => (
            <ItemComp _key={_key} path={path} />
          ))}
        </Stack>
      </ThemeProvider>
    );
  }
  return <div />;
};

export default ShelfComponent;
