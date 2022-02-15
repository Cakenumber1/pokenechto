import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';

import css from './OnloadOverlayComponent.module.scss';

const OnloadOverlayComponent:
FunctionComponent<{ component: FunctionComponent }> = ({
  component: Component,
  ...restProps
}) => {
  const [isAnimated, setIsAnimated] = useState(true);
  // mozg: 0iq
  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(false);
    }, 2000);
  }, []);

  useEffect(() => {
  }, [isAnimated]);

  return (
    <div id="Home">
      <div className={isAnimated ? `${css.Overlay}  ${css.onload}` : css.Overlay}>
        <div />
      </div>
      <Component {...restProps} />
    </div>
  );
};

export default OnloadOverlayComponent;
