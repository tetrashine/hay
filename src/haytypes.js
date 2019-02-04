const parse = function(obj) {
  let parsed;

  if (obj && typeof(obj) === "object" && !Array.isArray(obj)) {
    let inner = {};
    
    Object.keys(obj).map((key, i) => {
      inner[key] = parse(obj[key]);
    });

    parsed = {
      target: inner,
    };
    
  } else if (Array.isArray(obj)) {
    parsed = {
      target: obj.map(_ => {
        return parse(_);
      }),
    };
  } else {
    parsed = {
      target: obj,
    };
  }

  return parsed;
}

const generateErrorMsg = (outlet, obj, type) => {
  if (outlet) {
    outlet.messages.push({
      obj: obj,
      type: type,
      message: `Expect '${obj}' to be type:${type}`,
    });
  }
  
  return false;
};

const generateKeyErrorMsg = (outlet, key, obj, type) => {
  if (outlet) {
    outlet.messages.push({
      obj: obj,
      type: type,
      message: `Expect ${key}:${obj} to be type:${type}`,
    });
  }

  return false;
};

const generateNonEmptyMsg = (outlet, obj) => {
  if (outlet) {
    outlet.messages.push({
      obj: obj,
      message: `Required but received empty.`,
    });
  }

  return false;
};

const number = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === "number")) || generateErrorMsg(outlet, obj, "number");
const string = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === "string")) || generateErrorMsg(outlet, obj, "string");
const bool = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === "boolean")) || generateErrorMsg(outlet, obj, "boolean");
const object = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === "object" && !array(obj))) || generateErrorMsg(outlet, obj, "object");
const array = (obj, outlet) => (obj && (Empty(obj.target) || Array.isArray(obj.target))) || generateErrorMsg(outlet, obj, "array");
const func = (obj, outlet) => (obj && (Empty(obj.target) || {}.toString.call(obj.target) === '[object Function]')) || generateErrorMsg(outlet, obj, "function");

const mapping = {
  number: number,
  string: string,
  bool: bool,
  object: object,
  array: array,
  func: func,
};

const oneOf = (types) => (obj, outlet) => {
  return types.some((type, i) => type(obj, outlet));
};

const shapeOf = template => (obj, outlet) => {
  return !Empty(obj.target)
    && (object(obj) && Object.keys(template).map((key, i) => {
      const ret = template[key](obj.target[key], outlet);
      return ret;
    }).every(_ => {
      return _;
    }))
    || (func({ target: template }) && template(obj, outlet));
};

const Empty = (obj) => obj === undefined || obj === null;
const Required = type => (obj, outlet) => { return ((obj && !Empty(obj.target, outlet)) || generateNonEmptyMsg(outlet, obj)) && type(obj, outlet); };
const ArrayOfFunc = type => (objs, outlet) => (array(objs) && objs.target.every((obj, i) => type(obj, outlet)));

const arrayOf = {};
Object.keys(mapping).forEach(key => {
  arrayOf[key] = ArrayOfFunc(mapping[key]);
});

[number, string, bool, object, array, func].forEach(type => {
  type.isRequired = Required(type);
});

export {number, string, bool, object, array, func, oneOf, arrayOf, shapeOf, parse};