import { useEffect, useLayoutEffect, useState } from 'react';

export function useMatchMedia(minWidth: number, maxWidth?: number) {
  const [fit, setFit] = useState(false);
  useLayoutEffect(() => {
    function updateSize() {
      if(maxWidth)
      setFit(window.innerWidth >= minWidth && window.innerWidth < maxWidth);
      else {
        setFit(window.innerWidth >= minWidth);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [minWidth, maxWidth]);
  return fit;
}

export function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return {width, height};
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
