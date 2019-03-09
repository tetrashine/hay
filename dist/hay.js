/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/hay.js":
/*!********************!*\
  !*** ./src/hay.js ***!
  \********************/
/*! exports provided: hay, HayTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hay\", function() { return hay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HayTypes\", function() { return HayTypes; });\n/* harmony import */ var _haytypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./haytypes */ \"./src/haytypes.js\");\n\n\nclass Hay {\n\n  constructor() {\n    this.opts = {\n        class: 'highlighted',\n    };\n  }\n\n  wrap(text, opts) {\n    return `<span class='${opts.class}'>${text}</span>`;\n  }\n\n  check(obj, ruleOrRules) {\n    this._messages = [];\n    this._display = {};\n\n    let parsed = HayTypes.parse(obj);\n    this.outlet = {\n      messages: this._messages,\n      display: this._display,\n      original: obj,\n      parsed: parsed,\n    };\n\n    return Array.isArray(ruleOrRules) ? ruleOrRules.every(rule => {\n      return rule(parsed, this._messages);\n    }) : ruleOrRules(parsed, this._messages);\n  }\n\n  getMessages() {\n    let objs = this.outlet.messages.map(message => {\n      return message.obj;\n    }).filter(_ => {\n      return !!_;\n    });\n\n    return [this.outlet.messages, JSON.stringify(this.outlet.parsed, (key, val) => {\n      return objs.some(_ => _ === val) ? this.wrap(val.target, this.opts) : val.target;\n    }, \"    \")];\n  }\n}\n\nconst hay = new Hay();\nconst HayTypes = { ..._haytypes__WEBPACK_IMPORTED_MODULE_0__ };\n\nwindow.Hay = hay;\nwindow.HayTypes = HayTypes;\n\n//# sourceURL=webpack:///./src/hay.js?");

/***/ }),

/***/ "./src/haytypes.js":
/*!*************************!*\
  !*** ./src/haytypes.js ***!
  \*************************/
/*! exports provided: number, string, bool, object, array, func, oneOf, arrayOf, shapeOf, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"number\", function() { return number; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"string\", function() { return string; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bool\", function() { return bool; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"object\", function() { return object; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"array\", function() { return array; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"func\", function() { return func; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"oneOf\", function() { return oneOf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arrayOf\", function() { return arrayOf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shapeOf\", function() { return shapeOf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parse\", function() { return parse; });\n// function to parse object by by adding a thin wrapper for checks\n// to be able to map message back to object for highlight\nconst parse = function(obj) {\n  let parsed;\n\n  //object\n  if (obj && typeof(obj) === \"object\" && !Array.isArray(obj)) {\n    let inner = {};\n    \n    Object.keys(obj).map((key, i) => {\n      inner[key] = parse(obj[key]);\n    });\n\n    parsed = {\n      target: inner,\n    };\n  \n  //array\n  } else if (Array.isArray(obj)) {\n    parsed = {\n      target: obj.map(_ => {\n        return parse(_);\n      }),\n    };\n\n  //the rest\n  } else {\n    parsed = {\n      target: obj,\n    };\n  }\n\n  return parsed;\n}\n\nconst generateErrorMsg = (outlet, obj, type) => {\n  if (outlet) {\n    outlet.push({\n      obj: obj,\n      type: type,\n      message: `Expect '${obj}' to be 'type:${type}'`,\n    });\n  }\n\n  return false;\n};\n\nconst generateNonEmptyMsg = (outlet, obj) => {\n  if (outlet) {\n    outlet.push({\n      obj: obj,\n      message: `Required but received empty.`,\n    });\n  }\n\n  return false;\n};\n\nconst number = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === \"number\")) || generateErrorMsg(outlet, obj, \"number\");\nconst string = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === \"string\")) || generateErrorMsg(outlet, obj, \"string\");\nconst bool = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === \"boolean\")) || generateErrorMsg(outlet, obj, \"boolean\");\nconst object = (obj, outlet) => (obj && (Empty(obj.target) || typeof(obj.target) === \"object\" && !array(obj))) || generateErrorMsg(outlet, obj, \"object\");\nconst array = (obj, outlet) => (obj && (Empty(obj.target) || Array.isArray(obj.target))) || generateErrorMsg(outlet, obj, \"array\");\nconst func = (obj, outlet) => (obj && (Empty(obj.target) || {}.toString.call(obj.target) === '[object Function]')) || generateErrorMsg(outlet, obj, \"function\");\n\nconst equalLength = (type) => (obj, outlet) => {\n  let res = type(obj, outlet) && Array.isArray(obj.target);\n  let length = obj.target[0].target.length\n  let res2 = obj.target.every(_ => {\n    return _.target.length = length;\n  });\n\n  return res && res2;\n};\n\nconst generatorFunc = (type) => (generator) => (obj, outlet) => {\n  let generatorFunction = (function*(){}).constructor;\n  if (!(generator instanceof generatorFunction)) { throw 'Invalid generator function'; }\n\n  let gen = generator();\n  return type(obj, outlet) && obj.target.every(_ => {\n    return gen.next().value(_);\n  });\n};\n\n//  number - positive, negative, even, odd, \n//  string - equalLength, \n//  object - \n//  array - shapeOf, generatorFunc\n//  func - \narray.withGeneratorFunc = generatorFunc(array);\n\nconst oneOf = (types) => (obj, outlet) => {\n  return types.some((type, i) => type(obj, outlet));\n};\n\nconst shapeOf = template => (obj, outlet) => {\n  return !Empty(obj.target)\n    && (object(obj) && Object.keys(template).map((key, i) => {\n      const ret = template[key](obj.target[key], outlet);\n      return ret;\n    }).every(_ => {\n      return _;\n    }))\n    || (func({ target: template }) && template(obj, outlet))\n    || (Array.isArray(obj) && Array.isArray(template) && obj.map((item, index) => {\n      return template[index](item); \n    }));\n};\n\nconst Empty = (obj) => obj === undefined || obj === null;\nconst Required = type => (obj, outlet) => { return ((obj && !Empty(obj.target, outlet)) || generateNonEmptyMsg(outlet, obj)) && type(obj, outlet); };\nconst ArrayOfFunc = type => (objs, outlet) => (array(objs) && objs.target.every((obj, i) => type(obj, outlet)));\n\n\n// arrayOf type: function(hayType)\n//  To check to whether the target is an array of hayType\nconst arrayOf = (type) => (objs, outlet) => {\n  //check if type is of hayType\n\n  return (array(objs) && objs.target.every((obj, i) => type(obj, outlet)));\n};\n\n[number, string, bool, object, array, func].forEach(type => {\n  type.isRequired = Required(type);\n});\n\n\n\n//# sourceURL=webpack:///./src/haytypes.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./src/hay.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! D:\\workspace\\2019\\hay\\src\\hay.js */\"./src/hay.js\");\n\n\n//# sourceURL=webpack:///multi_./src/hay.js?");

/***/ })

/******/ });