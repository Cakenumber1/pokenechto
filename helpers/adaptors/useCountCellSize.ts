import { useWindowDimensions } from '../MathMedia/MathMediaHooks';

export function useCountCellSize() {

  const {width, height} = useWindowDimensions()
  let temp : number

  //IDK
  switch(true) {
    case (width<500):
      temp = .9 * .55 * .23 * height;
      break;
    case (width<1000):
      temp = .9 * .75 * .20 * height;
      break
    default:
      temp = .9 * .75 * .30 * height
      break
  }
  return temp
}