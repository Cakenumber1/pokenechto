const countLvl = (exp: number) => {
  let lvl = 0;
  for (let i = 1; i < 50; i++) {
    lvl++;
    if ((4 * i ** 3) / 5 > exp) return lvl;
  }
  return 50;
};

export const countStats = (poke: any) => {
  const lvl = countLvl(poke.exp);
  let power = 0;
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const stat of poke.stats) {
    power += stat.statVal;
  }
  // eslint-disable-next-line operator-assignment
  power = Math.ceil((1 + lvl / 10) * power);
  return { lvl, power };
};
