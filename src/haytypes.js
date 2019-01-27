const number = (obj) => Empty(obj) || typeof(obj) === "number";
const string = (obj) => Empty(obj) || typeof(obj) === "string";
const bool = (obj) => Empty(obj) || typeof(obj) === "boolean";
const object = (obj) => Empty(obj) || typeof(obj) === "object" && !array(obj);
const array = (obj) => Empty(obj) || Array.isArray(obj);
const func = (obj) => Empty(obj) || {}.toString.call(obj) === '[object Function]';

const mapping = {
  number: number,
  string: string,
  bool: bool,
  object: object,
  array: array,
  func: func,
};

const oneOf = (types) => (obj) => {
  return types.some(type => type(obj));
};

const shapeOf = template => obj => {
  return Object.keys(template).every(key => {
    return template[key](obj[key]);
  });
};

const Empty = obj => obj === undefined || obj === null;
const Required = type => obj => { return !Empty(obj) && type(obj); };
const ArrayOfFunc = type => objs => (array(objs) && objs.every(obj => type(obj)));

const arrayOf = {};
Object.keys(mapping).forEach(key => {
  arrayOf[key] = ArrayOfFunc(mapping[key]);
});

[number, string, bool, object, array, func].forEach(type => {
  type.isRequired = Required(type);
});

export {number, string, bool, object, array, func, oneOf, arrayOf, shapeOf};