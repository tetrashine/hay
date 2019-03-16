// function to parse object by by adding a thin wrapper for checks
// to be able to map message back to object for highlight
const parse = function(obj) {
  let parsed;

  //object
  if (obj && typeof(obj) === "object" && !Array.isArray(obj)) {
    let inner = {};
    
    Object.keys(obj).map((key, i) => {
      inner[key] = parse(obj[key]);
    });

    parsed = {
      target: inner,
    };
  
  //array
  } else if (Array.isArray(obj)) {
    parsed = {
      target: obj.map(_ => {
        return parse(_);
      }),
    };

  //the rest
  } else {
    parsed = {
      target: obj,
    };
  }

  return parsed;
}

const generateErrorMsg = (outlet, obj, type) => {
  if (outlet) {
    outlet.push({
      obj: obj,
      type: type,
      message: `Expect '${obj}' to be 'type:${type}'`,
    });
  }

  return false;
};

const generateNonEmptyMsg = (outlet, obj) => {
  if (outlet) {
    outlet.push({
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

const equalLength = (type) => (obj, outlet) => {
  let res = type(obj, outlet) && Array.isArray(obj.target);
  let length = obj.target[0].target.length
  let res2 = obj.target.every(_ => {
    return _.target.length = length;
  });

  return res && res2;
};

const generatorFunc = (type) => (generator) => (obj, outlet) => {
  let generatorFunction = (function*(){}).constructor;
  if (!(generator instanceof generatorFunction)) { throw 'Invalid generator function'; }

  let gen = generator();
  return type(obj, outlet) && obj.target.every(_ => {
    return gen.next().value(_);
  });
};

const iterativeFunc = (type) => userFunc => (obj, outlet) => {
  if (!func({ target: userFunc })) { throw 'Invalid function'; }

  return type(obj, outlet) && obj.target.every((_, index) => {
    return userFunc(_, index);
  });
}

//  number - positive, negative, even, odd, 
//  string - equalLength, 
//  object - 
//  array - shapeOf, generatorFunc
//  func - 
array.withFunc = iterativeFunc(array);
array.withGeneratorFunc = generatorFunc(array);

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
    || (func({ target: template }) && template(obj, outlet))
    || (Array.isArray(obj) && Array.isArray(template) && obj.map((item, index) => {
      return template[index](item); 
    }));
};

const Empty = (obj) => obj === undefined || obj === null;
const Required = type => (obj, outlet) => { return ((obj && !Empty(obj.target, outlet)) || generateNonEmptyMsg(outlet, obj)) && type(obj, outlet); };
const ArrayOfFunc = type => (objs, outlet) => (array(objs) && objs.target.every((obj, i) => type(obj, outlet)));


// arrayOf type: function(hayType)
//  To check to whether the target is an array of hayType
const arrayOf = (type) => (objs, outlet) => {
  //check if type is of hayType

  return (array(objs) && objs.target.every((obj, i) => type(obj, outlet)));
};

[number, string, bool, object, array, func].forEach(type => {
  type.isRequired = Required(type);
});

export {number, string, bool, object, array, func, oneOf, arrayOf, shapeOf, parse};