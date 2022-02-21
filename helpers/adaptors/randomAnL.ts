export function randomAnL() {
  const temp = Math.round(Math.random() * 10);
  const temp2 = Math.round(Math.random() * 10);
  const limit = temp;
  const amount = temp - temp2 > 0 ? temp - temp2 : 0;
  return { limit, amount };
}
