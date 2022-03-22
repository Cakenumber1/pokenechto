import ShelfComponent from 'components/Shop/Shelf/ShelfComponent';
import React from 'react';
import { useGetShopPokemonIDsQuery } from 'store/service';

import { useStylesStack } from '../style';

type Props = {
  shelfn: number,
};

const ShelfContainer: React.FC<Props> = ({ shelfn }) => {
  const classesStack = useStylesStack();
  const { data: pokeIDs } = useGetShopPokemonIDsQuery();
  let pkeys;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (pokeIDs) ? pkeys = pokeIDs!.slice(3 * shelfn, 2 * 3 * shelfn) : pkeys = null;
  return (
    <ShelfComponent classes={classesStack} pkeys={pkeys} />
  );
};

export default ShelfContainer;
