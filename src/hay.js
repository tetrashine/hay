import * as Types from './haytypes';

class Hay {

  constructor(config) {}

  check(obj, rules) {
    return rules(obj);
  }
}

export const hay = new Hay();
export const HayTypes = { ...Types };