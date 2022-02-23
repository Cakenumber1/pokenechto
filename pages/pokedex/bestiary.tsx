import { FrameComponent } from 'components/Common/FrameComponent';
import withAuth from 'components/HOCs/withAuthHOC';
import React from 'react';

import { BestiaryContainer } from '../../containers/BestiaryContainer';

const Bestiary = () => (
  <FrameComponent>
    <BestiaryContainer />
  </FrameComponent>
);

export default withAuth(Bestiary);
