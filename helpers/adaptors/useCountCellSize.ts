import { useWindowDimensions } from 'helpers/MediaHooks/MediaHooks';

export function useCountCellSize() {
  const { width, height } = useWindowDimensions();
  let temp : number;

  // IDK
  switch (true) {
    case (width < 500):
      temp = 0.9 * 0.55 * 0.23 * height;
      break;
    default:
      temp = 0.9 * 0.75 * 0.20 * height;
      break;
  }
  return temp;
}
