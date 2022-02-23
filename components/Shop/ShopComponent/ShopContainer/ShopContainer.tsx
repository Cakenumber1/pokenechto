import React from 'react';

import ShopComponent from '../ShopComponent';

type Props = {
  onclick: () => void
};

const ShopContainer: React.FC<Props> = ({ onclick }) => (
  <ShopComponent onclick={onclick} />
);

export default ShopContainer;
