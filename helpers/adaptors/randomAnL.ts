export function randomAnL() {
  const limit = Math.round(Math.random() * 2 + 1);
  const amount = limit;
  return { limit, amount };
}
