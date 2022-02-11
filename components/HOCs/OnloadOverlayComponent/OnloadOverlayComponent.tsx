import React, { Component, FunctionComponent, useEffect, useState } from 'react';
import css from './OnloadOverlayComponent.module.scss'

type Props = {
  isClicked?: boolean,
  ClickHandler?: () => void,
}
const OnloadOverlayComponent:
  FunctionComponent<{ component: FunctionComponent }> =
  ({
     component: Component,
     ...restProps
   }) => {
    const [isAnimated, setIsAnimated] = useState(true);
    //mozg: 0iq
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setIsAnimated(false);
      }, 2000)
    }, [])

    useEffect(() => {
    }, [isAnimated]);

    const handleClick = () => {
      setIsClicked(true);
    }

    return (
      <div id={'Home'}>
        <div className={isAnimated ? `${css.Overlay}  ${css.onload}` : css.Overlay}>
          <div/>
        </div>
        <Component {...restProps} />
      </div>
    )
  }

export default OnloadOverlayComponent;
