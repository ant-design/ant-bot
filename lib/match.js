module.exports = function match(filter, properties) {
  const keys = Object.keys(properties);
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (filter[key] && !RegExp(filter[key]).test(properties[key])) {
      return false;
    }
    const negateKey = `^${key}`;
    if (filter[negateKey] && RegExp(filter[negateKey]).test(properties[key])) {
      return false;
    }
  }
  return true;
}
