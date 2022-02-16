import clsx from 'clsx';
import {
  FunctionComponent,
  useEffect, useRef,
  useState,
} from 'react';

import css from './OnloadOverlayComponent.module.scss';

const OnloadOverlayComponent:
FunctionComponent<{ component: FunctionComponent }> = ({
  component: Component,
  ...restProps
}) => {
  const overlay = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const overlayStyle = clsx({
    [css.Overlay]: true,
    [css.onload]: isAnimated,
    [css.clicked]: isClicked,
  });
  function onclick() : void {
    setIsClicked(true);
  }
  useEffect(() => {
    overlay.current?.addEventListener('animationend', () => {
      setIsAnimated(false);
    });
  }, []);

  const props = { onclick, ...restProps };
  return (
    <div id="Home" ref={overlay} style={{ width: '100%', height: '100%' }}>
      <div className={overlayStyle}>
        <div />
      </div>
      <Component {...props} />
    </div>
  );
};

export default OnloadOverlayComponent;
