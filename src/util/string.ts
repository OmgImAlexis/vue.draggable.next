function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const regex = /-(\w)/g;
export const camelize = cached(str => str.replace(regex, (_, c) => c.toUpperCase()));

