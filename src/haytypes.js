let number = (obj) => Empty(obj) || typeof(obj) === "number";
let string = (obj) => Empty(obj) || typeof(obj) === "string";
let bool = (obj) => Empty(obj) || typeof(obj) === "boolean";
let object = (obj) => Empty(obj) || typeof(obj) === "object";
let array = (obj) => Array.isArray(obj);
let func = (obj) => Empty(obj) || {}.toString.call(obj) === '[object Function]';

let oneOf = (types) => (obj) => {
  return types.some(type => type(obj));
};

let Empty = obj => obj === undefined || obj === null;
let Required = (type) => (obj) => { return !Empty(obj) && type(obj); };

[number, string, bool, object, array, func].forEach(type => {
  type.isRequired = Required(type);
});

export {number, string, bool, object, array, func, oneOf};