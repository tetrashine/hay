import * as Types from './haytypes';

class Hay {

  constructor() {
    this.opts = {
        class: 'highlighted',
    };
  }

  wrap(text, opts) {
    return `<span class='${opts.class}'>${text}</span>`;
  }

  check(obj, rules) {
    this._messages = [];
    this._display = {};

    let parsed = HayTypes.parse(obj);
    this.outlet = {
      messages: this._messages,
      display: this._display,
      original: obj,
      parsed: parsed,
    };

    return rules(parsed, this._messages);
  }

  getMessages() {
    let objs = this.outlet.messages.map(message => {
      return message.obj;
    }).filter(_ => {
      return !!_;
    });

    return [this.outlet.messages, JSON.stringify(this.outlet.parsed, (key, val) => {
      return objs.some(_ => _ === val) ? this.wrap(val.target, this.opts) : val.target;
    }, "    ")];
  }
}

export const hay = new Hay();
export const HayTypes = { ...Types };

window.Hay = hay;
window.HayTypes = HayTypes;