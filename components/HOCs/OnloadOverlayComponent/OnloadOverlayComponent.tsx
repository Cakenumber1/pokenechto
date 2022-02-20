import clsx from 'clsx';
import {
  ComponentType,
  useEffect,
  useRef,
  useState,
} from 'react';

import css from './OnloadOverlayComponent.module.scss';

export const withOverlay = <InjectedProps extends { onclick: () => void }, P extends InjectedProps>(
  WrappedComponent: ComponentType<P>,
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithOverlay = (props: Omit<P, keyof InjectedProps>) => {
    const overlay = useRef<HTMLDivElement>(null);
    const [isAnimated, setIsAnimated] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    const overlayStyle = clsx({
      [css.Overlay]: true,
      [css.onload]: isAnimated,
      [css.clicked]: isClicked,
    });
    const onclick = () => {
      setIsClicked(true);
    };
    useEffect(() => {
      overlay.current?.addEventListener('animationend', () => {
        setIsAnimated(false);
      });
    }, []);

    return (
      <div id="Home" ref={overlay} style={{ width: '100%', height: '100%' }}>
        <div className={overlayStyle}>
          <div />
        </div>
        <WrappedComponent {...props as P} onclick={onclick} />
      </div>
    );
  };

  ComponentWithOverlay.displayName = `withTheme(${displayName})`;

  return ComponentWithOverlay;
};

export default withOverlay;
