import { Box, Stack } from '@mui/material';
import { ClassNameMap, ThemeProvider } from '@mui/styles';
import CellContainer from 'components/Shop/Cell/CellContainer';
import { useStylesItem } from 'components/Shop/Shelf/style';
import React from 'react';
import { theme } from 'theme/index';

type Props = {
  classes: ClassNameMap,
  pkeys: string[] | null,
  path: string
};

type ItemType = {
  _key: string,
  path: string
};

const ItemComp = ({ _key, path }: ItemType) => {
  const classesItem = useStylesItem();
  return (
    <Box key={_key} className={classesItem.item}>
      <CellContainer pokeid={_key} path={path} />
    </Box>
  );
};

const ShelfComponent: React.FC<Props> = ({ classes, pkeys, path }) => {
  if (pkeys) {
    return (
      <ThemeProvider theme={theme}>
        <Stack className={classes.stack} direction="row">
          {pkeys?.map((_key) => (
            <ItemComp _key={_key} path={path} />
          ))}
        </Stack>
      </ThemeProvider>
    );
  }
  return <Box />;
};

export default ShelfComponent;
