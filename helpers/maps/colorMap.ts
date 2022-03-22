const colorMap = new Map([
  ['normal', [168, 168, 120]],
  ['fire', [240, 128, 48]],
  ['water', [104, 144, 240]],
  ['grass', [120, 200, 80]],
  ['electric', [248, 208, 48]],
  ['ice', [152, 216, 216]],
  ['fighting', [192, 48, 40]],
  ['poison', [160, 64, 160]],
  ['ground', [224, 192, 104]],
  ['flying', [199, 191, 248]],
  ['psycho', [248, 88, 136]],
  ['psychic', [248, 88, 136]],
  ['bug', [168, 184, 32]],
  ['rock', [184, 160, 56]],
  ['ghost', [112, 88, 152]],
  ['dark', [112, 88, 72]],
  ['dragon', [112, 56, 248]],
  ['steel', [184, 184, 208]],
  ['fairy', [245, 201, 208]],
]);

export const getBackgdoundColor = (types : string[]) => {
  if (types.length > 1) {
    let color = '';
    for (let i = 0; i < types.length - 1; i++) {
      color += `rgb(${colorMap.get(types[i])}),`;
    }
    color += `rgb(${colorMap.get(types[types.length - 1])})`;
    return `linear-gradient(${color})`;
  }
  return `rgb(${colorMap.get(types[types.length - 1])})`;
};
