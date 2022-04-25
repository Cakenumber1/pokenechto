import BuildingComponent from 'components/Building/BuildingComponent';
import React from 'react';

import { useStyles } from '../style';

type Props = {
  children: JSX.Element
};

const BuildingContainer: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <BuildingComponent classes={classes}>
      {children}
    </BuildingComponent>
  );
};

export default BuildingContainer;
