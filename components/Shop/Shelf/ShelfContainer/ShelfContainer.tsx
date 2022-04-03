import ShelfComponent from 'components/Shop/Shelf/ShelfComponent';
import React from 'react';
import { usePostShopPokemonIDsQuery } from 'store/service';

import { useStylesStack } from '../style';

type Props = {
  shelfn: string,
};

const ShelfContainer: React.FC<Props> = ({ shelfn }) => {
  const classesStack = useStylesStack();
  const { data: res } = usePostShopPokemonIDsQuery(shelfn);
  const path = `/shop/shelves/${shelfn}`;
  const pkeys = res?.ids || null;
  if (pkeys) {
    return (
      <ShelfComponent classes={classesStack} pkeys={pkeys} path={path} />
    );
  }
  return <div />;
};

export default ShelfContainer;
