let Number = (obj) => typeof(obj) === "number";
let String = (obj) => typeof(obj) === "string";
let Boolean = (obj) => typeof(obj) === "boolean";
let Object = (obj) => typeof(obj) === "object";
let Arr = (obj) => Array.isArray(obj);
let Function = (obj) => obj && {}.toString.call(obj) === '[object Function]';

let Required = (type) => (obj) => { return obj !== undefined && obj !== null && type(obj); }

[Number, String, Boolean, Object, Arr, Function].forEach(type => {
  type.isRequired = Required(type);
});

class Hay {

  constructor(config) {}

  check(obj, rules) {
    return rules(obj);
  }
}

export const hay = new Hay();
export const HayTypes = {
  number: Number,
  string: String,
  bool: Boolean,
  object: Object,
  array: Arr,
  func: Function,
};