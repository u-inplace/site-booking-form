/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/booking/common/constants.js":
/*!*****************************************!*\
  !*** ./src/booking/common/constants.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXTRA": function() { return /* binding */ EXTRA; },
/* harmony export */   "SERVICE": function() { return /* binding */ SERVICE; }
/* harmony export */ });
/**
 * Helper file for webflow inplace.be booking_
 */
const SERVICE = {
  Cleaning: 'cleaning',
  Ironing: 'ironing',
  Cooking: 'cooking',
  Grocery: 'grocery'
};
const EXTRA = {
  Windows: 'windows',
  Cabinets: 'cabinets',
  Fridge: 'fridge',
  Oven: 'oven'
};

/***/ }),

/***/ "./src/booking/controllers/navigation.js":
/*!***********************************************!*\
  !*** ./src/booking/controllers/navigation.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NavigationController; }
/* harmony export */ });
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking/helpers/dom.js");
/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sequence */ "./src/booking/controllers/sequence.js");


class NavigationController {
  sequence;

  constructor({
    formId = 'wf-form-step',
    sequence = new _sequence__WEBPACK_IMPORTED_MODULE_1__["default"]()
  }) {
    this.sequence = sequence; // Submit = nextButton

    if (_helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id(formId)) _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id(formId).onsubmit = this.onNext.bind(this);
    _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id('back-button')?.addEventListener('click', this.onBack.bind(this)); // Browser history

    window.onpopstate = this.onBack.bind(this);
  } // Navigate to first STEP (Services)


  restart() {
    window.location.href = _sequence__WEBPACK_IMPORTED_MODULE_1__.STEP.Services;
  }
  /**
   *
   * @param {import('./sequence').StepCode} step
   */


  goto(step) {
    window.location.href = step;
  }
  /**
   * @param {Event} e
   */


  onNext(e) {
    e.preventDefault(); // eslint-disable-next-line no-restricted-globals

    history.pushState({}, null, location.href);
    window.location.href = this.sequence.next();
  }

  onBack() {
    // eslint-disable-next-line no-restricted-globals
    // history.back()
    window.location.href = this.sequence.prev();
  }

}

/***/ }),

/***/ "./src/booking/controllers/options.js":
/*!********************************************!*\
  !*** ./src/booking/controllers/options.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BookingOptions; }
/* harmony export */ });
/**
 * @typedef {{cleaning:boolean, cooking:boolean, grocery:boolean, ironing:boolean}} Service
 * @typedef {('cleaning'|'cooking'|'grocery'|'ironing')[]} Services
 */

/**
 * Helpers
 */

/**
 * Removes prefix from string
 * @param {string} s input String
 * @param {string} p prefix to be removed
 * @returns {string} string without prefix
 */
const rmPrefix = (s, p) => s.replace(new RegExp(`^${p}`), '');
/**
 * Booking Options
 * @class
 * @constructor
 * @public
 */


class BookingOptions {
  cookie;
  /**
   * @typedef {Object} SessionOptions
   * @property {string} cleaning-bathrooms
   * @property {string} cleaning-bedrooms
   * @property {boolean} extra-cabinets
   * @property {boolean} extra-fridge
   * @property {boolean} extra-oven
   * @property {boolean} extra-windows
   * @property {string} ironing
   * @property {string} postal-code
   * @property {boolean} service-cleaning
   * @property {boolean} service-cooking
   * @property {boolean} service-grocery
   * @property {boolean} service-ironing
   * @property {number} duration
   * @property {string} frequency
   * @property {string} start-timestamp
   * @property {string} end-timestamp
   * @property {string} team-member
   * @property {string} team-member-name
   * @property {string} team-member-first-name
   */

  /**
   * @type {SessionOptions}
   */

  ops;

  constructor() {
    this.cookie = window.FpCookie;
    this.ops = this.cookie.store;
  }
  /**
   * Check if options are valid
   */


  get isValid() {
    return Object.keys(this.ops).length > 0;
  }
  /**
   * @param {string} prefix
   * @returns {object}
   */


  #getOptionWithPrefix(prefix) {
    return Object.entries(this.ops) // eslint-disable-next-line no-unused-vars
    .filter(([key, _]) => key.startsWith(prefix)).reduce((acc, [key, value]) => {
      acc[rmPrefix(key, prefix)] = value;
      return acc;
    }, {});
  }
  /**
   * @param {string} prefix
   * @param {(any|undefined)} [filter=undefined]
   * @returns {any[]}
   */


  #filterOptionWithPrefix(prefix, filter = undefined) {
    return Object.entries(this.ops).filter(([key, value]) => key.startsWith(prefix) && (filter === undefined || value === filter)) // eslint-disable-next-line no-unused-vars
    .map(([key, _]) => rmPrefix(key, prefix));
  }
  /**
   * @returns {{bathrooms:string, bedrooms:string}}
   */


  get cleaning() {
    return this.ops['service-cleaning'] ? this.#getOptionWithPrefix('cleaning-') : {};
  }
  /**
   * @returns {('cabinets' | 'fridge' | 'oven' | 'windows')[]}
   */


  get extras() {
    return this.ops['service-cleaning'] ? this.#filterOptionWithPrefix('extra-', true) : [];
  }
  /**
   * @returns {{cabinets:boolean, fridge:boolean, oven:boolean, windows:boolean}}
   */


  get extra() {
    return this.ops['service-cleaning'] ? this.#getOptionWithPrefix('extra-') : {};
  }
  /**
   * @returns {('xs'|'s'|'m'|'l'|'xl'|'')}
   */


  get ironing() {
    return this.ops['service-ironing'] ? this.ops.ironing.replace('ironing-size-', '') : '';
  }
  /**
   * @returns {number}
   */


  get postalCode() {
    return this.ops['postal-code'];
  }
  /**
   * @returns {Services}
   */


  get services() {
    return this.#filterOptionWithPrefix('service-', true);
  }
  /**
   * @returns {Service}
   */


  get service() {
    return this.#getOptionWithPrefix('service-');
  }
  /**
   * @returns {number}
   */


  get duration() {
    return this.ops?.duration;
  }
  /**
   * @returns {('weekly'|'biweekly'|'once')}
   */


  get recurrence() {
    return this.ops?.frequency;
  }
  /**
   * @returns {Date}
   */


  get start() {
    return new Date(this.ops['start-timestamp']);
  }
  /**
   * @returns {Date}
   */


  get end() {
    return new Date(this.ops['end-timestamp']);
  }
  /**
   * @typedef {Object} TeamMember
   * @property {string} id
   * @property {string} name
   * @property {string} firstName
   *
   * @returns {TeamMember}
   */


  get teamMember() {
    return {
      id: this.ops['team-member'],
      name: this.ops['team-member-name'],
      firstName: this.ops['team-member-first-name']
    };
  }

}

/***/ }),

/***/ "./src/booking/controllers/sequence.js":
/*!*********************************************!*\
  !*** ./src/booking/controllers/sequence.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STEP": function() { return /* binding */ STEP; },
/* harmony export */   "default": function() { return /* binding */ Sequence; }
/* harmony export */ });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");

/**
 * @typedef {string} StepCode
 */

/**
 * @enum {StepCode}
 */

const STEP = {
  PostalCode: '/booking',
  Services: '/booking/services',
  Ironing: '/booking/ironing',
  Cleaning: '/booking/cleaning',
  Duration: '/booking/duration',
  Availability: '/booking/availability',
  Confirmation: '/booking/confirmation'
};
const COOKIE_BOOKING = '__booking';
/**
 * Sequence Controller
 */

class Sequence {
  #current;
  list;
  /**
   * @param {StepCode} curr
   */

  constructor(curr) {
    const cookieStr = js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].get(COOKIE_BOOKING);

    if (cookieStr) {
      const cookie = JSON.parse(cookieStr);
      this.list = cookie.seq;
    } else this.init({});

    this.current = curr;
  }

  init({
    ironing = false,
    cleaning = false
  } = {}) {
    let seq = [STEP.PostalCode, STEP.Services];
    if (ironing) seq.push(STEP.Ironing);
    if (cleaning) seq.push(STEP.Cleaning);
    seq = seq.concat([STEP.Duration, STEP.Availability, STEP.Confirmation]);
    this.list = seq;
    this.setCookies();
  }

  setCookies() {
    js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].set(COOKIE_BOOKING, JSON.stringify({
      seq: this.list
    }), {
      secure: true,
      sameSite: 'strict'
    });
  }

  next() {
    return this.list[this.#current + 1];
  }

  prev() {
    return this.list[this.#current - 1];
  }

  get total() {
    return this.list.length;
  }

  get current() {
    return this.list[this.#current];
  }
  /**
   * @param {string} current
   */


  set current(curr) {
    const currIndex = Object.values(this.list).findIndex(e => e === curr);
    if (currIndex >= 0) this.#current = currIndex;
  }

  get currentIndex() {
    return this.#current;
  }

}


/***/ }),

/***/ "./src/booking/controllers/step.js":
/*!*****************************************!*\
  !*** ./src/booking/controllers/step.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ StepController; }
/* harmony export */ });
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking/helpers/dom.js");
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation */ "./src/booking/controllers/navigation.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options */ "./src/booking/controllers/options.js");
/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sequence */ "./src/booking/controllers/sequence.js");




class StepController {
  /**
   * @type {HTMLFormElement}
   */
  form;
  /**
   * @type {NavigationController}
   */

  nav;
  /**
   * @type {BookingOptions}
   */

  ops;
  /**
   * Create new StepController
   * @param {import('./sequence').StepCode} curr Current step
   * @param {string} formId Step form Id
   */

  constructor(curr, formId = 'wf-form-step') {
    this.form = _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id(formId);
    this.nav = new _navigation__WEBPACK_IMPORTED_MODULE_1__["default"]({
      formId,
      sequence: new _sequence__WEBPACK_IMPORTED_MODULE_3__["default"](curr)
    });
    this.ops = new _options__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.validateState();
  }
  /**
   * Initialize controller
   */


  init() {
    this.setupInputHandlers();
    _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].nextButtonDisabled = true;
    this.toggleNext();
    this.updateNav();
  }
  /**
   * Create event handlers
   */


  setupInputHandlers() {
    this.form.querySelectorAll('input').forEach(input => {
      // Do not mess with submit button
      if (input.type === 'submit') return;
      const inputEvent = {
        radio: 'click',
        number: 'input'
      };
      const event = inputEvent[input.type] || 'change';
      input.addEventListener(event, this.toggleNext.bind(this)); // Sometimes inputs start checked for no reason
      // eslint-disable-next-line no-param-reassign

      input.checked = false;
    });
  }
  /**
   * Check if a booking session cookie exists with booking options
   * Otherwise, redirect to /booking/services
   */


  validateState() {
    // eslint-disable-next-line no-debugger
    debugger;
    if (!this.ops.isValid || !this.ops.postalCode) this.nav.goto(_sequence__WEBPACK_IMPORTED_MODULE_3__.STEP.PostalCode);else if (this.ops.services.length === 0) this.nav.goto(_sequence__WEBPACK_IMPORTED_MODULE_3__.STEP.Services);
  }
  /**
   * Toggle next button active
   */


  toggleNext() {
    _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].nextButtonDisabled = this.isNextDisabled;
  }
  /**
   * Control next button
   */
  // eslint-disable-next-line class-methods-use-this


  get isNextDisabled() {
    return false;
  }
  /**
   * Update Nav step count
   */


  updateNav() {
    _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id('step-nav').innerHTML = `Step ${this.nav.sequence.currentIndex}/${this.nav.sequence.total - 1}`;
  }

}

/***/ }),

/***/ "./src/booking/helpers/dom.js":
/*!************************************!*\
  !*** ./src/booking/helpers/dom.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line max-classes-per-file
class Dom {
  /**
   * Get Element by Id
   *
   * @param {string} id element id
   * @returns {Element}
   */
  static id(id) {
    return document.getElementById(id);
  }
  /**
   * Query selector
   *
   * @param {string} query Dom query string
   * @returns {Element}
   */


  static q(query) {
    return document.querySelector(query);
  }
  /**
   * Query selector all
   *
   * @param {string} query Dom query string
   * @returns {NodeList}
   */


  static qall(query) {
    return document.querySelectorAll(query);
  }
  /**
   * Message popup
   * @param {string} id
   * @returns {Promise}
   */


  static toast(id) {
    const toastBlock = Dom.id(id);
    toastBlock.classList.add('active');
    return setTimeout(() => {
      toastBlock.classList.remove('active');
    }, 1000 * 4);
  }

  static set nextButtonDisabled(isDisabled) {
    const nextButton = document.querySelector('.next-button-flow');
    if (!nextButton) return;
    nextButton.disabled = isDisabled;
    if (isDisabled) nextButton.classList.add('disabled');else nextButton.classList.remove('disabled');
  }
  /**
   * Helpers
   */


  static queryOptions(id, checked = false) {
    return Array.from(document.querySelectorAll(`input[id*='${id}']${checked ? ':checked' : ''}`));
  }

  static getRadio(name, checked = false) {
    return this.q(`input[name*="${name}"]${checked ? ':checked' : ''}`);
  }

  static queryRadio(name, checked = false) {
    return Array.from(this.qall(`input[name*='${name}']${checked ? ':checked' : ''}`));
  }

  static getOption(id, checked = false) {
    return this.q(`input[id*='${id}']${checked ? ':checked' : ''}`);
  }

}

const dom = Dom;
/* harmony default export */ __webpack_exports__["default"] = (dom);

/***/ }),

/***/ "./src/booking/helpers/dom/services.js":
/*!*********************************************!*\
  !*** ./src/booking/helpers/dom/services.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/booking/helpers/dom.js");

/**
 * Services
 */

class ServicesDom {
  static query(checked = false) {
    return _dom__WEBPACK_IMPORTED_MODULE_0__["default"].queryOptions('service-', checked);
  }
  /**
   * @returns {string[]}
   */


  static get selected() {
    return this.query(true).map(s => s.id.replace(/^.*-/, ''));
  }
  /**
   * @param {string} service
   * @returns {boolean}
   */


  static isServiceSelected(service) {
    return this.selected?.includes(service);
  }

}

const domServices = ServicesDom;
/* harmony default export */ __webpack_exports__["default"] = (domServices);

/***/ }),

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/*! js-cookie v3.0.1 | MIT */
/* eslint-disable no-var */
function assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (key, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      key + '=' + converter.write(value, key) + stringifiedAttributes)
  }

  function get (key) {
    if (typeof document === 'undefined' || (arguments.length && !key)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var foundKey = decodeURIComponent(parts[0]);
        jar[foundKey] = converter.read(value, foundKey);

        if (key === foundKey) {
          break
        }
      } catch (e) {}
    }

    return key ? jar[key] : jar
  }

  return Object.create(
    {
      set: set,
      get: get,
      remove: function (key, attributes) {
        set(
          key,
          '',
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */

/* harmony default export */ __webpack_exports__["default"] = (api);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************************!*\
  !*** ./src/booking/packages/services.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/booking/common/constants.js");
/* harmony import */ var _controllers_sequence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/sequence */ "./src/booking/controllers/sequence.js");
/* harmony import */ var _controllers_step__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/step */ "./src/booking/controllers/step.js");
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking/helpers/dom.js");
/* harmony import */ var _helpers_dom_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/dom/services */ "./src/booking/helpers/dom/services.js");
/* eslint-disable class-methods-use-this */

/* eslint-disable vars-on-top */

/* eslint-disable no-use-before-define */

/* eslint-disable no-var */






class ServicesStep extends _controllers_step__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor() {
    super(_controllers_sequence__WEBPACK_IMPORTED_MODULE_1__.STEP.Services); // Restart sequence

    _helpers_dom__WEBPACK_IMPORTED_MODULE_3__["default"].id('next-btn').addEventListener('click', this.onNext.bind(this));
  }

  init() {
    super.init();
    this.nav.sequence.init();
  }

  validateState() {// Do nothing
  }

  onNext() {
    const {
      selected
    } = _helpers_dom_services__WEBPACK_IMPORTED_MODULE_4__["default"];
    this.nav.sequence.init({
      ironing: selected.includes(_common_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Ironing),
      cleaning: selected.includes(_common_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Cleaning)
    });
  }
  /**
   * @returns {boolean}
   */


  get isNextDisabled() {
    return _helpers_dom_services__WEBPACK_IMPORTED_MODULE_4__["default"].selected.length === 0;
  }

  updateNav() {// Do not update nav
  }

}

var Webflow = Webflow || window.Webflow || [];
Webflow.push(() => {
  const step = new ServicesStep();
  step.init();
});
}();
/******/ })()
;
//# sourceMappingURL=services.js.map