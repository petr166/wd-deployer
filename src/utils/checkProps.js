const checkProps = (obj, requiredProps) => {
  return requiredProps.some(key => {
    if (!obj[key]) {
      throw new Error(`--${key} required`);
    }

    return !obj[key];
  });
};

module.exports = {
  checkProps,
};
