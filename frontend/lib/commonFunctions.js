export const isString = str => typeof str === 'string' || str instanceof String;
export const calcPercentOf = (known, reference) => {
  if (known > 0 && reference > 0) {
    return ((reference * 100) / known).toFixed(2);
  }
  return 0;
};
export const shadeColor = (color, percent) => {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
};

export const blendColors = (c0, c1, p) => {
  var f = parseInt(c0.slice(1), 16),
    t = parseInt(c1.slice(1), 16),
    R1 = f >> 16,
    G1 = (f >> 8) & 0x00ff,
    B1 = f & 0x0000ff,
    R2 = t >> 16,
    G2 = (t >> 8) & 0x00ff,
    B2 = t & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((R2 - R1) * p) + R1) * 0x10000 +
      (Math.round((G2 - G1) * p) + G1) * 0x100 +
      (Math.round((B2 - B1) * p) + B1)
    )
      .toString(16)
      .slice(1)
  );
};
export const isEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
export const formatAddressSingleLine = address =>
  `${address.street || ''}${address.street ? ' ' : ''}${address.houseNo || ''}${
    address.street ? ', ' : ''
  }${address.zip || ''}${address.zip ? ' ' : ''}${address.city || ''}${
    address.zip || address.city ? ', ' : ''
  }${address.country || ''}`;
export const arrowGenerator = color => {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
};

export const ToLocalCurrency = (value, fractions) =>
  value.toLocaleString('de-de', {
    currency: 'EUR',
    style: 'currency',
    minimumFractionDigits: fractions,
    maximumFractionDigits: fractions,
  });
