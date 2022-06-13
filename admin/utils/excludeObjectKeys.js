const excludeObjectKeys = (object, keysArray) => {
  const obj = { ...object };

  keysArray.forEach((field) => delete obj[field]);

  return obj;
};

export default excludeObjectKeys;
