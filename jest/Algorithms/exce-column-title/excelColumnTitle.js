const convertToTitle = n => {
  if (n <= 26) {
    return String.fromCharCode(64 + n);
  }

  const mod = n % 26;
  const rem = Math.floor(n / 26);
  if (mod === 0) {
    return convertToTitle(rem - 1) + convertToTitle(26);
  }
  return convertToTitle(rem) + convertToTitle(mod);
};

export default convertToTitle;
