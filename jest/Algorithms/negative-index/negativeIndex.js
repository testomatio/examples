const negativeIndex = targetArray => {
  const negativeIndexHandler = {
    get(target, prop) {
      if (typeof prop === 'string' && typeof parseInt(prop, 10) === 'number' && prop < 0) {
        return target[target.length + parseInt(prop, 10)];
      }
      return Reflect.get(target, prop);
    },

    set(target, prop, val) {
      if (typeof parseInt(prop, 10) === 'number' && prop < 0) {
        target[target.length + parseInt(prop, 10)] = val;
        return val;
      }
      return Reflect.set(target, prop, val);
    },
  };

  if (!(targetArray instanceof Array)) {
    throw new TypeError('Only arrays are supported');
  }

  return new Proxy(targetArray, negativeIndexHandler);
};

export default negativeIndex;
