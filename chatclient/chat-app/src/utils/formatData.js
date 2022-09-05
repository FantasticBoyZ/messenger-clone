const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const truncate = (str, n) => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};

const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

const FormatDataUtils = {
  isEmptyObject,
  truncate,
  removeExtraSpace,
};

export default FormatDataUtils;
