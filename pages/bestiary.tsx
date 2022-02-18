import { FrameComponent } from 'components/Common/FrameComponent';
import React from 'react';

import { BestiaryContainer } from '../containers/BestiaryContainer';

export default function bestiary() {
  const a = 1;
  return (
    <FrameComponent key={a}>
      <BestiaryContainer />
    </FrameComponent>
  );
}
