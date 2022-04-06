/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/booking/constants.js":
/*!**********************************!*\
  !*** ./src/booking/constants.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXTRA": function() { return /* binding */ EXTRA; },
/* harmony export */   "SERVICE": function() { return /* binding */ SERVICE; },
/* harmony export */   "STEP": function() { return /* binding */ STEP; }
/* harmony export */ });
/**
 * Helper file for webflow inplace.be booking_
 */
const STEP = {
  PostalCode: 0,
  Services: 1,
  Ironing: 2,
  Cleaning: 3,
  Duration: 4,
  Availability: 5,
  Contact: 6
};
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

/***/ "./src/booking/dom.js":
/*!****************************!*\
  !*** ./src/booking/dom.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DOM; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable max-classes-per-file */

/**
 * DOM query and manipulators
 */

class DOM {
  static queryOptions(id, checked = false) {
    return Array.from(document.querySelectorAll(`input[id*='${id}']${checked ? ':checked' : ''}`));
  }

  static getOption(id, checked = false) {
    return document.querySelector(`input[id*='${id}']${checked ? ':checked' : ''}`);
  }

  static queryRadio(name, checked = false) {
    return Array.from(document.querySelectorAll(`input[name*='${name}']${checked ? ':checked' : ''}`));
  }

  static getRadio(name, checked = false) {
    return document.querySelector(`input[name*="${name}"]${checked ? ':checked' : ''}`);
  }

  static setNextButtonDisabled(isDisabled) {
    const nextButtonList = document.querySelectorAll('.next-button-slide');
    Array.from(nextButtonList).forEach(nextButton => {
      // eslint-disable-next-line no-param-reassign
      nextButton.disabled = isDisabled;
      if (isDisabled) nextButton.classList.add('disabled');else nextButton.classList.remove('disabled');
    });
  }
  /**
   * STEP: Services
   * */


  static queryServices(checked = false) {
    return DOM.queryOptions('service-', checked);
  }

  static getSelectedServices() {
    return DOM.queryServices(true).map(s => s.id.replace(/^.*-/, ''));
  }

  static isServiceSelected(service) {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default().includes(DOM.getSelectedServices(), service);
  }
  /**
   * STEP: Ironing
   */


  static getSelectedIroning() {
    return DOM.getRadio('ironing-size', true)?.value?.replace(/^ironing-size-/, '');
  }
  /**
   * STEP: Cleaning - Extras
   * */


  static queryCleaningExtras(checked = false) {
    return DOM.queryOptions('extra-', checked);
  }

  static getSelectedCleaningExtras() {
    return DOM.queryCleaningExtras(true).map(s => s.id.replace(/^.*-/, ''));
  }

  static isExtraSelected(extra) {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default().includes(DOM.getSelectedCleaningExtras(), extra);
  }
  /**
   * STEP: Cleaning - Home
   * */


  static isBedroomSelected() {
    return DOM.getRadio('home-bedrooms', true);
  }

  static isBathroomSelected() {
    return DOM.getRadio('home-bathrooms', true);
  }
  /**
   * General functions
   */


  static hide(id) {
    document.getElementById(id).style.display = 'none';
  }

  static display(id) {
    document.getElementById(id).style.display = 'inline-block';
    document.getElementById(id).style.visibility = 'visible';
    document.getElementById(id).style.transform = 'none';
  }
  /**
   * Postal Code
   */


  static get postalCode() {
    return document.getElementById('postal-code');
  }

  static postalCodeToast() {
    DOM.toast('alert-area');
  }
  /**
   * Slider
   */


  static slider = class {
    static get element() {
      return document.getElementById('booking-slider');
    }

    static get nextButtonAll() {
      return document.getElementById('booking-slider').querySelectorAll('.next-button-slide');
    }

    static get backButtonAll() {
      return document.getElementById('booking-slider').querySelectorAll('.back-button-slide');
    }

    static setActive(stepNo) {
      document.getElementById(`step-${stepNo}`).classList.add('very-active');
    }

    static setInactive(stepNo) {
      document.getElementById(`step-${stepNo}`).classList.remove('very-active');
    }

    static getStepHeight(stepNo) {
      return document.getElementById(`step-${stepNo}`).offsetHeight;
    }

    static set formHeight(height) {
      // Add some more for shadow box below
      height && (document.getElementsByClassName('form-mask')[0].style.height = `${height + 150}px`);
    }

  };

  static get duration() {
    return document.getElementById('duration').value;
  }

  static get occurrence() {
    return DOM.getRadio('frequency', true).value;
  }

  static teamMember = class {
    static get name() {
      return document.getElementById('team-member-name').value;
    }

    static set name(name) {
      document.getElementById('team-member-name').value = name;
    }

    static get firstName() {
      return document.getElementById('team-member-first-name').value;
    }

    static set firstName(first) {
      document.getElementById('team-member-first-name').value = first;
    }

    static get avatar() {
      return document.getElementById('team-members-block').querySelector('img').src;
    }

  };
  /** *
   * Summary
   */

  static summary = class {
    static activeService(service) {
      document.getElementById(`summary-${service}`).classList.add('service-active');
    }

    static inactiveService(service) {
      document.getElementById(`summary-${service}`).classList.remove('service-active');
    }

    static set duration(time) {
      document.getElementById('summary-duration').innerText = time;
    }

    static set occurrence(freq) {
      document.getElementById('summary-occurrence').innerText = freq;
    }

    static set payment(value) {
      document.getElementById('summary-payment').innerText = value;
    }

  };
  /**
   * Availability
   */

  static calendar = class {
    static openings = class {
      static cleanUp() {
        document.getElementById('start-time-block')?.querySelectorAll('.start-time')?.forEach(e => e.parentNode.removeChild(e));
      }

      static showWarning() {
        document.getElementById('aval-warning').classList.add('msg-active');
      }

      static hideWarning() {
        document.getElementById('aval-warning').classList.remove('msg-active');
      }

    };
    static team = class {
      static showBlock() {
        document.getElementById('team-members-block').classList.add('visible');
      }

      static hideBlock() {
        document.getElementById('team-members-block').classList.remove('visible');
      }

      static cleanUp() {
        document.getElementById('team-members-block')?.querySelectorAll('.team-member')?.forEach(e => e.parentNode.removeChild(e));
      }

      static get memberTemplate() {
        return document.getElementById('team-member-template');
      }

    };
  };
  /**
   * Message
   */

  static toast(id) {
    const toastBlock = document.getElementById(id);
    toastBlock.classList.add('active');
    return setTimeout(() => {
      toastBlock.classList.remove('active');
    }, 1000 * 4);
  }
  /** *
   * FORM
   */


  static form = class {
    static submitButtonText;
    static msgTimeout;

    static done() {
      document.getElementById('wf-form-Booking').classList.add('completed');
      document.getElementById('form-done').classList.add('active');
    }

    static onSubmit() {
      const button = document.getElementById('button-submit');
      this.submitButtonText = button.value;
      button.value = button.attributes['data-wait'].value;
      button.disabled = true;
      button.classList.add('wait');

      if (this.msgTimeout) {
        clearTimeout(this.msgTimeout);
        DOM.form.error.hide();
      }
    }

    static onSubmitDone() {
      const button = document.getElementById('button-submit');
      button.value = this.submitButtonText;
      button.disabled = false;
      button.classList.remove('wait');
    }

    static error = class {
      static set title(title) {
        document.getElementById('error-title').innerText = title;
      }

      static set detail(title) {
        document.getElementById('error-detail').innerText = title;
      }

      static toast(id) {
        this.msgTimeout = DOM.toast(id);
      }

    };
    static summary = class {
      static activeService(service) {
        document.getElementById(`conf-${service}`).classList.add('service-active');
      }

      static inactiveService(service) {
        document.getElementById(`conf-${service}`).classList.remove('service-active');
      }

      static set duration(time) {
        document.getElementById('conf-duration').innerText = time;
      }

      static set occurrence(freq) {
        document.getElementById('conf-occurrence').innerText = freq;
      }

      static set payment(value) {
        document.getElementById('conf-payment').innerText = value;
      }

      static set start(value) {
        document.getElementById('conf-start').innerText = value;
      }
      /**
       * @typedef {{avatar: string, name: string}} Member
       * @param {Member} member
       */


      static set team(member) {
        document.getElementById('conf-team-avatar').src = member.avatar;
        document.getElementById('conf-team-name').innerText = member.firstName;
      }

    };
  };
}

/***/ }),

/***/ "./src/booking/form.js":
/*!*****************************!*\
  !*** ./src/booking/form.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Form; }
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/booking/dom.js");



class Form {
  /**
   * Log error
   * @param {*} res
   */
  static async logError(res) {
    console.log('Something went wrong...');
    console.log(`Status: ${res.status} ${res.statusText}`);
    if (res?.body) console.log(`Response: ${await res?.body}`);else console.log(`Response: ${res}`);
  }
  /**
   * Read options and create a summary
   */


  static createSummary() {
    // Selected services
    const services = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedServices();
    Object.values(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE).forEach(s => services.includes(s) ? _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.summary.activeService(s) : _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.summary.inactiveService(s));
    const {
      duration
    } = _dom__WEBPACK_IMPORTED_MODULE_1__["default"];
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.summary.duration = `${duration}h`;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.summary.payment = `${duration} titres-services`;
    const startIso = document.getElementById('start-timestamp').value;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.summary.start = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(new Date(startIso), 'dd/MM/yyyy H:mm');
    const {
      occurrence
    } = _dom__WEBPACK_IMPORTED_MODULE_1__["default"];
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.summary.occurrence = occurrence; // Team member

    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.summary.team = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].teamMember;
  }
  /**
   * Form Submission
   * @param {SubmitEvent} event
   */


  static async onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const json = Object.fromEntries(data.entries());
    const url = new URL(form.attributes.action.value);

    try {
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.onSubmit();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          contentType: 'application/json',
          dataType: 'json'
        },
        body: JSON.stringify(json)
      });
      const resJson = await res.json();

      if (res.status >= 300) {
        Form.logError(res);
        if (resJson?.errors?.sodexo_reference) _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.error.toast('toast-sodexo');else _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.error.toast('toast-submit-error');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.onSubmitDone();
      } else {
        setTimeout(() => {
          Form.createSummary();
          _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.done();
        }, 1000 * 1);
      }
    } catch (error) {
      Form.logError(error.message);
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.error.toast('toast-submit-error');
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].form.onSubmitDone();
    }
  }

}

/***/ }),

/***/ "./src/booking/main.js":
/*!*****************************!*\
  !*** ./src/booking/main.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! smoothscroll-polyfill */ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js");
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vivify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vivify.css */ "./src/vivify.css");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form */ "./src/booking/form.js");
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigation */ "./src/booking/navigation.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/booking/style.css");
/* eslint-disable no-var */





/**
 * Add handlers
 */

const sliderController = () => {
  // kick off the polyfill!
  smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0___default().polyfill(); //  ONly starts after page is loaded

  const navController = new _navigation__WEBPACK_IMPORTED_MODULE_3__["default"]();
  navController.init(); // Setup form submit action

  document.getElementById('wf-form-Booking').onsubmit = _form__WEBPACK_IMPORTED_MODULE_2__["default"].onSubmit.bind(undefined);
}; // eslint-disable-next-line no-use-before-define


var Webflow = Webflow || window.Webflow || [];
Webflow.push(sliderController);

/***/ }),

/***/ "./src/booking/model.js":
/*!******************************!*\
  !*** ./src/booking/model.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BookingModel; }
/* harmony export */ });
/**
 * Booking model
 */
class BookingModel {
  steps;

  constructor(steps) {
    this.steps = steps;
  }

  static getInstance() {
    this.instance ??= new BookingModel();
    return this.instance;
  }

  get estimation() {
    return Math.floor(Object.values(this.steps).reduce((acc, s) => {
      // eslint-disable-next-line no-param-reassign
      acc += s ? s.duration : 0;
      return acc;
    }, 3.0));
  }

  static set estimation(estimation) {
    document.getElementById('duration').nextElementSibling.noUiSlider.set(estimation);
  }

  updateEstimation() {
    BookingModel.estimation = this.estimation;
  }

  static get coverage() {
    return ['1070', '1160', '1082', '1000', '1040', '1140', '1190', '1083', '1130', '1050', '1090', '1081', '1020', '1080', '1120', '1060', '1210', '1030', '1180', '1170', '1200', '1150'];
  }

}

/***/ }),

/***/ "./src/booking/navigation.js":
/*!***********************************!*\
  !*** ./src/booking/navigation.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Navigation; }
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/booking/model.js");
/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sequence */ "./src/booking/sequence.js");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider */ "./src/booking/slider.js");
/* harmony import */ var _steps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps */ "./src/booking/steps/index.js");




class Navigation {
  #slider;
  #sequence;
  #model;

  init() {
    // Create model instance
    this.#model = _model__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
    this.#model.steps = _steps__WEBPACK_IMPORTED_MODULE_3__["default"];
    this.#slider = _slider__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance();
    this.#sequence = new _sequence__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.#slider.sequence = this.#sequence; // Add handler for slider changes

    this.#slider.onChange = this.onChange.bind(this); // Init all steps

    Object.values(_steps__WEBPACK_IMPORTED_MODULE_3__["default"]).forEach(s => s.init()); // Activate first step as 'back' to avoid autofollow

    _steps__WEBPACK_IMPORTED_MODULE_3__["default"][0].onActive('back');
  }

  onChange(event) {
    _steps__WEBPACK_IMPORTED_MODULE_3__["default"][this.#slider.current].onActive(event);
  }

}

/***/ }),

/***/ "./src/booking/sequence.js":
/*!*********************************!*\
  !*** ./src/booking/sequence.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Sequence; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/booking/dom.js");


/**
 * Sequence Controller
 */

class Sequence {
  #current;

  constructor() {
    this.reset();
  }

  reset(keepCurrent = false) {
    !keepCurrent && (this.#current = 0);
    let seq = [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.PostalCode, _constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Services];
    if (_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isServiceSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Ironing)) seq.push(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Ironing);
    if (_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isServiceSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Cleaning)) seq.push(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Cleaning);
    seq = seq.concat([_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Duration, _constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Availability, _constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Contact]);
    this.list = seq;
  }

  get next() {
    this.#current++;
    console.log(`Seq : ${this.list} ; curr : ${this.#current}`);
    return this.list[this.#current];
  }

  get prev() {
    this.#current--;
    console.log(`Seq : ${this.list} ; curr : ${this.#current}`);
    return this.list[this.#current];
  }

  get total() {
    return this.list.length;
  }

  get current() {
    return this.list[this.#current];
  }

  get currentIndex() {
    return this.#current;
  }

}

/***/ }),

/***/ "./src/booking/slider.js":
/*!*******************************!*\
  !*** ./src/booking/slider.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider; }
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/booking/dom.js");
/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sequence */ "./src/booking/sequence.js");
/* harmony import */ var _slider_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider.css */ "./src/booking/slider.css");



/**
 * Custom slider
 * Why? Cus' Webflow slider sucks
 */

class Slider {
  #sequence;
  #onChange;

  constructor(sequence) {
    this.#sequence = sequence || new _sequence__WEBPACK_IMPORTED_MODULE_1__["default"](); // Events to resize form after each step
    // Seems that this works sometimes, but not always when the page
    // is loading
    // window.addEventListener('load', () => this.resize(), false)
    // window.addEventListener('resize', () => this.resize(), false)
  }

  static getInstance() {
    this.instance ??= new Slider();
    return this.instance;
  }

  set onChange(fn) {
    this.#onChange = fn;
  }

  resize() {
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.formHeight = _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.getStepHeight(this.current);
  }

  set sequence(sequence) {
    this.#sequence = sequence;
  }

  get sequence() {
    return this.#sequence;
  }

  get current() {
    return this.#sequence.current;
  }

  next() {
    // Set current step as inactive
    const {
      current
    } = this.#sequence;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.setInactive(current); // Get next in sequence and active it

    const {
      next
    } = this.#sequence;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.setActive(next);
    this.resize();
    this.#onChange("next");
  }

  prev() {
    // Set current step as inactive
    const {
      current
    } = this.#sequence;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.setInactive(current); // Get prev in sequence and active it

    const {
      prev
    } = this.#sequence;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.setActive(prev);
    this.resize();
    this.#onChange("back");
  }

}

/***/ }),

/***/ "./src/booking/steps/availability.js":
/*!*******************************************!*\
  !*** ./src/booking/steps/availability.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AvailabilityStep; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _calendar_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../calendar/main */ "./src/calendar/main.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom */ "./src/booking/dom.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");
/* eslint-disable camelcase */

/* eslint-disable class-methods-use-this */






/**
 * @typedef {Object} Opening
 * @property {Date} start
 * @property {Date} end
 * @property {string} start_time
 * @property {Employee} employee
 */

/**
 * Availability Step Controller
 * @class
 * @constructor
 * @public
 */

class AvailabilityStep extends _base__WEBPACK_IMPORTED_MODULE_4__["default"] {
  #calendar;
  /**
   * Openings for a day
   * @type {Opening[]}
   * @protected
   */

  openings;
  /**
   * Team Members
   * @typedef {{fileId: string, url: string }} Image
   * @typedef {Object} TeamMember
   * @property {String} name
   * @property {String} slug
   * @property {String} email
   * @property {Image} profile-picture
   */

  /**
   * @type {TeamMember[]}
   * @protected
   */

  team;

  constructor() {
    super(_constants__WEBPACK_IMPORTED_MODULE_2__.STEP.Availability);
  }

  get isNextDisabled() {
    return !_dom__WEBPACK_IMPORTED_MODULE_3__["default"].getRadio('team-member', true);
  }

  onActive(event) {
    // Only clean up if going from a previous page
    if (event === 'back') return;
    super.onActive(); // Get all team members from Webflow CMS

    this.#fetchTeam(); // Clean up existing entries

    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.team.cleanUp();
    this.toggleNext(); // Update duration when loading Duration step

    this.#calendar = new _calendar_main__WEBPACK_IMPORTED_MODULE_1__["default"]('availability-cal', {
      postalCode: _dom__WEBPACK_IMPORTED_MODULE_3__["default"].postalCode.value,
      duration: _dom__WEBPACK_IMPORTED_MODULE_3__["default"].duration,
      recurrence: _dom__WEBPACK_IMPORTED_MODULE_3__["default"].occurrence
    }, this.onDayChange.bind(this));
    this.#createSummary();
  }
  /**
   * Fetch team members from webflow CMS
   */


  async #fetchTeam() {
    const url = new URL('https://inplace-booking.azurewebsites.net/api/collection');
    const params = new URLSearchParams({
      code: 'Itrex4w/daAwDFd78PsawdASdJyo9clkm1OOhG0Z3GLEe6m484/49A==',
      name: 'team'
    });
    url.search = params;
    const res = await fetch(url);
    const team = await res.json();
    this.team = team;
  }
  /**
   * Read options and create a summary
   */


  #createSummary() {
    // Selected services
    const services = _dom__WEBPACK_IMPORTED_MODULE_3__["default"].getSelectedServices();
    Object.values(_constants__WEBPACK_IMPORTED_MODULE_2__.SERVICE).forEach(s => services.includes(s) ? _dom__WEBPACK_IMPORTED_MODULE_3__["default"].summary.activeService(s) : _dom__WEBPACK_IMPORTED_MODULE_3__["default"].summary.inactiveService(s));
    const {
      duration
    } = _dom__WEBPACK_IMPORTED_MODULE_3__["default"];
    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].summary.duration = `${duration}h`;
    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].summary.payment = `${duration} titres-services`;
    const {
      occurrence
    } = _dom__WEBPACK_IMPORTED_MODULE_3__["default"];
    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].summary.occurrence = occurrence;
  }
  /**
   * Load all available openings
   * An opening has the following structure
   *
   * @typedef {Object} Employee
   * @property {String} id
   * @property {String} first_name
   * @property {String} last_name
   * @property {String} allergies
   *
   * @param  {string} day
   * @param  {Opening[]} openings
   *
   * */


  onDayChange(day, openings) {
    // Get template checkbox
    const template = document.getElementById('start-time-template'); // Store day options

    this.openings = openings; // Clean up existing entries

    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.openings.cleanUp(); // Hide Team block

    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.team.hideBlock();
    if (lodash__WEBPACK_IMPORTED_MODULE_0___default().isEmpty(openings)) _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.openings.showWarning();else _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.openings.hideWarning();

    lodash__WEBPACK_IMPORTED_MODULE_0___default().uniqBy(openings, 'start_time').forEach(open => {
      this.copyTemplate(template, {
        className: 'start-time',
        parentId: 'start-time-block',
        labelClass: 'start-time-text',
        labelText: open.start_time,
        radioGroup: 'start-time',
        radioEvent: 'click',
        radioEventHandler: this.onStartTimeSelect.bind(this),
        radioValue: open.start_time
      });
    });
  }
  /**
   * handle start time selection
   * @param {MouseEvent} event
   */


  onStartTimeSelect(event) {
    // Clean up existing entries
    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.team.cleanUp();
    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.team.showBlock();
    const start_time = event.target.value;
    const template = _dom__WEBPACK_IMPORTED_MODULE_3__["default"].calendar.team.memberTemplate; // Set start and end time on hidden inputs

    document.getElementById('start-timestamp').value = this.openings[0].start.toISOString();
    document.getElementById('end-timestamp').value = this.openings[0].end.toISOString();

    lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(this.openings, {
      start_time
    }).forEach(open => {
      const node = this.copyTemplate(template, {
        className: 'team-member',
        parentId: 'team-members-block',
        labelClass: 'team-member-name',
        labelText: open.employee.first_name,
        radioGroup: 'team-member',
        radioValue: open.employee.id,
        radioEvent: 'click',
        radioEventHandler: this.onTeamMemberSelect.bind(this)
      }); // Get profile picture from webflow collections

      const avatar = lodash__WEBPACK_IMPORTED_MODULE_0___default().find(this.team, {
        name: `${open.employee.first_name} ${open.employee.last_name}`
      })?.['profile-picture'];
      avatar?.url && (node.querySelector('.team-avatar').src = avatar.url); // Save team member name in attribute

      node.querySelector('input').setAttribute('member-name', `${open.employee.first_name} ${open.employee.last_name}`);
      node.querySelector('input').setAttribute('member-first-name', `${open.employee.first_name}`);
    }); // Wire events for next button


    this.toggleNextWatcher = new _watcher__WEBPACK_IMPORTED_MODULE_5__["default"](_dom__WEBPACK_IMPORTED_MODULE_3__["default"].queryRadio('team-member'), 'click');
    this.toggleNext(); // Trigger slide resize

    this.slider.resize();
  }
  /**
   * Read attrs and store team member name into input fields
   * @param {MouseEvent} event
   */


  onTeamMemberSelect(event) {
    const member = event.target;
    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].teamMember.name = member.getAttribute('member-name');
    _dom__WEBPACK_IMPORTED_MODULE_3__["default"].teamMember.firstName = member.getAttribute('member-first-name');
  }
  /**
   * Create a node copy from template
   *
   * @typedef {Object} Conf
   * @property {String} className
   * @property {String} parentId
   * @property {String} labelClass
   * @property {String} labelText
   * @property {String} radioGroup
   * @property {String} radioValue
   * @property {String} radioEvent
   * @property {Function} radioEventHandler
   *
   * @param {HTMLDivElement} template
   * @param {Conf} conf
   * @returns {HTMLObjectElement}
   */


  copyTemplate(template, conf) {
    const node = template.cloneNode(true);
    node.setAttribute('id', '');
    node.style.display = 'flex';
    node.classList.add(conf.className); // Handle clicks on option

    const radio = node.querySelector(`input[name*='${conf.radioGroup}']`);
    radio.setAttribute('id', '');
    radio.value = conf.radioValue;
    if (conf.radioEvent) radio.addEventListener(conf.radioEvent, conf.radioEventHandler);
    const label = node.querySelector(`.${conf.labelClass}`);
    label.innerText = conf.labelText;
    document.getElementById(conf.parentId).appendChild(node);
    return node;
  }

}

/***/ }),

/***/ "./src/booking/steps/base.js":
/*!***********************************!*\
  !*** ./src/booking/steps/base.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BaseStep; }
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/booking/dom.js");
/* harmony import */ var _step__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step */ "./src/booking/steps/step.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");
/* eslint-disable class-methods-use-this */



/**
 * Default step handler
 * Handles next and prev events
 */

class BaseStep extends _step__WEBPACK_IMPORTED_MODULE_1__["default"] {
  stepNo;

  constructor(stepNo) {
    super();
    this.stepNo = stepNo;
  }
  /**
   * Observer for next and back buttons
   */


  get observed() {
    const set = [{
      // Return only the button for the current slide
      elem: _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.nextButtonAll[this.stepNo],
      event: 'click',
      handler: this.onNext.bind(this)
    }, {
      // Disconsider the first step, as it does not have a back button
      elem: _dom__WEBPACK_IMPORTED_MODULE_0__["default"].slider.backButtonAll[this.stepNo - 1],
      event: 'click',
      handler: this.onBack.bind(this)
    }, ...this.toggleNextWatcher.list.map(watcher => ({ ...watcher,
      handler: this.toggleNext.bind(this)
    }))];
    return set;
  }
  /**
   * Should be implemented in child classes
   */


  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }
  /**
   * Update list of watchers
   * @param {ToggleWatcher} toggleList
   */


  set toggleNextWatcher(toggleList) {
    this.wireEvents(toggleList.list.map(watcher => ({ ...watcher,
      handler: this.toggleNext.bind(this)
    })));
  }

  init() {
    super.init();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].setNextButtonDisabled(true); // Wierd bug but sometimes input start checked

    this.toggleNextWatcher.list.forEach(e => e.elem.checked = false);
  }

  toggleNext(dontAutoFollow = false) {
    const isDisabled = this.isNextDisabled;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].setNextButtonDisabled(this.isNextDisabled); // Autofollow - used on first step
    // The call from onBack must be handled manually since this method
    // is also called above by event, where the parameter is not a boolean

    const stopAutoFollow = typeof dontAutoFollow === 'boolean' && dontAutoFollow;

    if (!isDisabled && !stopAutoFollow && this.autoFollow) {
      // Animate button
      document.activeElement.blur();
      document.getElementById(`step-${this.stepNo}`).querySelector('.next-button-slide').classList.add('wait'); // Wait a bit before going

      setTimeout(() => {
        document.getElementById(`step-${this.stepNo}`).querySelector('.next-button-slide').classList.remove('wait');
        this.onNext();
      }, 500);
    }
  }

  onNext() {
    this.slider.next();
  }

  onBack() {
    this.slider.prev();
  }

  get sequence() {
    return this.slider.sequence;
  }
  /**
   * Triggered when slide becomes active
   */


  onActive(event) {
    this.updateNav(); // Disable autofollow when going back

    this.toggleNext(event === 'back');
  }

  updateNav() {
    document.getElementsByClassName('step-number')[this.stepNo - 1].innerHTML = `Step ${this.sequence.currentIndex}/${this.sequence.total - 1}`;
  }

}

/***/ }),

/***/ "./src/booking/steps/cleaning.js":
/*!***************************************!*\
  !*** ./src/booking/steps/cleaning.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CleaningStep; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/booking/dom.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* harmony import */ var _compound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./compound */ "./src/booking/steps/compound.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");
/* eslint-disable max-classes-per-file */

/* eslint-disable class-methods-use-this */





/**
 * Empty Step
 */

class BaseCleaningStep {
  get isNextDisabled() {
    return false;
  }

  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_4__["default"]();
  }

  get duration() {
    return 0;
  }

}

class Supplies extends BaseCleaningStep {
  get isNextDisabled() {
    return !_dom__WEBPACK_IMPORTED_MODULE_1__["default"].getOption('supplies-conf', true);
  }

  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_4__["default"](_dom__WEBPACK_IMPORTED_MODULE_1__["default"].queryOptions('supplies-conf'));
  }

}

class Extras extends _base__WEBPACK_IMPORTED_MODULE_2__["default"] {
  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_4__["default"](_dom__WEBPACK_IMPORTED_MODULE_1__["default"].queryCleaningExtras());
  }

  get duration() {
    if (!_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isServiceSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Cleaning)) return 0;
    let total = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].isExtraSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.EXTRA.Windows) ? 1 : 0;
    total += _dom__WEBPACK_IMPORTED_MODULE_1__["default"].isExtraSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.EXTRA.Cabinets) ? 1 : 0;
    total += _dom__WEBPACK_IMPORTED_MODULE_1__["default"].isExtraSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.EXTRA.Fridge) ? 0.5 : 0;
    total += _dom__WEBPACK_IMPORTED_MODULE_1__["default"].isExtraSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.EXTRA.Oven) ? 0.5 : 0;
    return total;
  }

}

class Home extends BaseCleaningStep {
  get isNextDisabled() {
    return !_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isBedroomSelected() || !_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isBathroomSelected();
  }

  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_4__["default"](_dom__WEBPACK_IMPORTED_MODULE_1__["default"].queryRadio('home-'));
  }

  get duration() {
    if (!_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isServiceSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Cleaning)) return 0;
    const bedroom = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getRadio('home-bedrooms', true)?.value;
    const bathroom = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getRadio('home-bathrooms', true)?.value;
    let total = 0;

    switch (bedroom) {
      case '3':
      case '4':
        total += 1;
        break;

      case '5+':
        total += 2;
        break;

      default:
        break;
    }

    switch (bathroom) {
      case '2':
        total += 1;
        break;

      case '3':
        total += 2;
        break;

      case '4+':
        total += 3;
        break;

      default:
        break;
    }

    return total;
  }

}

class CleaningStep extends _compound__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor() {
    super(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Cleaning, new Supplies(), new Extras(), new Home());
  }

}

/***/ }),

/***/ "./src/booking/steps/compound.js":
/*!***************************************!*\
  !*** ./src/booking/steps/compound.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CompoundStep; }
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");


/**
 * Step with multiple validations for next button
 */

class CompoundStep extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
  #steps;

  constructor(stepNo, ...steps) {
    super(stepNo);
    this.#steps = steps;
  }

  get isNextDisabled() {
    return this.#steps.reduce((acc, s) => acc || s.isNextDisabled, false);
  }

  get toggleNextWatcher() {
    const set = new _watcher__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.#steps.forEach(s => set.push(s.toggleNextWatcher.list));
    return set;
  }

  get duration() {
    return this.#steps.reduce((acc, s) => acc + s.duration, 0);
  }

  onNext() {
    super.onNext();
  }

  onBack() {
    super.onBack();
  }

}

/***/ }),

/***/ "./src/booking/steps/contact.js":
/*!**************************************!*\
  !*** ./src/booking/steps/contact.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ContactStep; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* eslint-disable class-methods-use-this */


class ContactStep extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Contact);
  }

  onActive(event) {
    super.onActive(event);
    this.setDefaultLang();
  }

  setDefaultLang() {
    // Get default user language from weglot
    const weGlotLang = document.querySelector('.wg-element-wrapper.sw8');
    const lang = weGlotLang?.querySelector('.w-dropdown-toggle')?.getAttribute('lang');
    document.getElementById(lang).click();
  }

}

/***/ }),

/***/ "./src/booking/steps/duration.js":
/*!***************************************!*\
  !*** ./src/booking/steps/duration.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DurationStep; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/booking/dom.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");
/* eslint-disable class-methods-use-this */




class DurationStep extends _base__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor() {
    super(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Duration);
  }

  get isNextDisabled() {
    return !_dom__WEBPACK_IMPORTED_MODULE_1__["default"].getRadio('frequency', true);
  }

  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_3__["default"](_dom__WEBPACK_IMPORTED_MODULE_1__["default"].queryRadio('frequency'), 'click');
  }

  onActive(event) {
    // Update duration when loading Duration step
    if (event === 'next') this.model.updateEstimation();
    super.onActive(event);
  }

}

/***/ }),

/***/ "./src/booking/steps/index.js":
/*!************************************!*\
  !*** ./src/booking/steps/index.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _availability__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./availability */ "./src/booking/steps/availability.js");
/* harmony import */ var _cleaning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cleaning */ "./src/booking/steps/cleaning.js");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact */ "./src/booking/steps/contact.js");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./duration */ "./src/booking/steps/duration.js");
/* harmony import */ var _ironing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ironing */ "./src/booking/steps/ironing.js");
/* harmony import */ var _postalCode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./postalCode */ "./src/booking/steps/postalCode.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services */ "./src/booking/steps/services.js");








const Steps = {
  [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.PostalCode]: new _postalCode__WEBPACK_IMPORTED_MODULE_6__["default"](),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Services]: new _services__WEBPACK_IMPORTED_MODULE_7__["default"](),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Ironing]: new _ironing__WEBPACK_IMPORTED_MODULE_5__["default"](),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Cleaning]: new _cleaning__WEBPACK_IMPORTED_MODULE_2__["default"](),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Duration]: new _duration__WEBPACK_IMPORTED_MODULE_4__["default"](),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Availability]: new _availability__WEBPACK_IMPORTED_MODULE_1__["default"](),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Contact]: new _contact__WEBPACK_IMPORTED_MODULE_3__["default"]()
};
/* harmony default export */ __webpack_exports__["default"] = (Steps);

/***/ }),

/***/ "./src/booking/steps/ironing.js":
/*!**************************************!*\
  !*** ./src/booking/steps/ironing.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ IroningStep; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/booking/dom.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");
/* eslint-disable class-methods-use-this */




class IroningStep extends _base__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor() {
    super(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Ironing);
  }

  get isNextDisabled() {
    return !_dom__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedIroning();
  }

  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_3__["default"](_dom__WEBPACK_IMPORTED_MODULE_1__["default"].queryOptions('ironing-size'), 'click');
  }

  get duration() {
    if (!_dom__WEBPACK_IMPORTED_MODULE_1__["default"].isServiceSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Ironing)) return 0;

    switch (_dom__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedIroning()) {
      case 'xs':
        return 0.5;

      case 's':
        return 1;

      case 'm':
        return 2;

      case 'l':
        return 3;

      case 'xl':
        return 4;

      default:
        return 0;
    }
  }

}

/***/ }),

/***/ "./src/booking/steps/postalCode.js":
/*!*****************************************!*\
  !*** ./src/booking/steps/postalCode.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PostalCodeStep; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/booking/dom.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model */ "./src/booking/model.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");
/* eslint-disable class-methods-use-this */





class PostalCodeStep extends _base__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor() {
    super(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.PostalCode);
  }

  init() {
    super.init(); // Autofocus on input

    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].postalCode.autofocus = true;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].postalCode.focus();
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].slider.setActive(0);
    this.slider.resize();
  }

  get isNextDisabled() {
    const pc = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].postalCode;
    return pc.value.length !== pc.maxLength || !_model__WEBPACK_IMPORTED_MODULE_2__["default"].coverage.includes(pc.value);
  }

  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_4__["default"]([_dom__WEBPACK_IMPORTED_MODULE_1__["default"].postalCode], 'input');
  }

  get observed() {
    return [...super.observed, {
      elem: _dom__WEBPACK_IMPORTED_MODULE_1__["default"].postalCode,
      event: 'input',
      handler: this.onPostalCodeInput
    }];
  }

  onNext() {
    // Remove focus to hide keyboard
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].postalCode.blur();
    document.activeElement.blur();
    super.onNext();
  }

  get autoFollow() {
    return true;
  }

  updateNav() {
    // No such thing on this step
    return null;
  }

  onPostalCodeInput(e) {
    const pc = e.target; // Trim input if goes bigger than max length

    if (pc.value.length > pc.maxLength) pc.value = pc.value.slice(0, pc.maxLength); // show error message

    if (pc.value.length === pc.maxLength && !_model__WEBPACK_IMPORTED_MODULE_2__["default"].coverage.includes(pc.value)) {
      // Scroll back to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].postalCodeToast();
    }
  }

}

/***/ }),

/***/ "./src/booking/steps/services.js":
/*!***************************************!*\
  !*** ./src/booking/steps/services.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ServicesStep; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/booking/constants.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/booking/dom.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ "./src/booking/steps/base.js");
/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./watcher */ "./src/booking/steps/watcher.js");
/* eslint-disable class-methods-use-this */




class ServicesStep extends _base__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor() {
    super(_constants__WEBPACK_IMPORTED_MODULE_0__.STEP.Services);
  }

  get isNextDisabled() {
    return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedServices().length === 0;
  }

  get toggleNextWatcher() {
    return new _watcher__WEBPACK_IMPORTED_MODULE_3__["default"](_dom__WEBPACK_IMPORTED_MODULE_1__["default"].queryServices());
  }

  get duration() {
    const services = _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedServices();
    let total = 0;

    if (services.length > 1) {
      total += _dom__WEBPACK_IMPORTED_MODULE_1__["default"].isServiceSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Cooking) ? 0.5 : 0;
      total += _dom__WEBPACK_IMPORTED_MODULE_1__["default"].isServiceSelected(_constants__WEBPACK_IMPORTED_MODULE_0__.SERVICE.Grocery) ? 0.5 : 0;
    }

    return total;
  }

  updateNav() {
    // No such thing on this step
    document.getElementsByClassName('step-number')[this.stepNo - 1].innerHTML = 'Step 1/-';
  }

  onNext() {
    this.sequence.reset(true);
    super.onNext();
  }

}

/***/ }),

/***/ "./src/booking/steps/step.js":
/*!***********************************!*\
  !*** ./src/booking/steps/step.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Step; }
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model */ "./src/booking/model.js");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../slider */ "./src/booking/slider.js");
/* eslint-disable class-methods-use-this */

/**
 * Step configuration
 */


class Step {
  slider;
  model;

  constructor() {
    this.slider = _slider__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance();
    this.model = _model__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance();
  }
  /**
   * @typedef {Object} Observed
   * @property {HTMLElement} elem
   * @property {string} event
   * @property {Function} handler
   */

  /**
   * @returns {Observed[]}
   */


  get observed() {
    return [];
  }

  get isNextDisabled() {
    return false;
  }

  get duration() {
    return 0;
  }

  get autoFollow() {
    return false;
  }
  /**
   * Hook events with handlers
   *
   * @param {Observed[]} set
   */


  wireEvents(set) {
    set.forEach(o => o?.elem?.addEventListener(o.event, o.handler));
  }
  /**
   * Create event handlers for observed attributes
   * expects an array of
   *  elem
   *  event = 'click'
   *  handler = fn
   */


  init() {
    this.wireEvents(this.observed);
  }

}

/***/ }),

/***/ "./src/booking/steps/watcher.js":
/*!**************************************!*\
  !*** ./src/booking/steps/watcher.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ToggleWatcher; }
/* harmony export */ });
/**
 * Next button watcher
 *
 * @class
 * @constructor
 * @public
 */
class ToggleWatcher {
  /**
   * @typedef {Object} Observed
   * @property {HTMLElement} elem
   * @property {string} event
   */

  /**
   * @type {Observed[]}
   * @public
   */
  list;
  /**
   *
   * @param {HTMLElement[]} elems
   * @param {string} event
   */

  constructor(elems = [], event = 'change') {
    this.list = elems.map(e => ({
      elem: e,
      event
    }));
  }
  /**
   *
   * @param {Observed[]} entries
   */


  push(entries) {
    this.list = this.list.concat(entries);
  }

}

/***/ }),

/***/ "./src/calendar/main.js":
/*!******************************!*\
  !*** ./src/calendar/main.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CalendarController; }
/* harmony export */ });
/* harmony import */ var color_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! color-calendar */ "./node_modules/color-calendar/dist/bundle.js");
/* harmony import */ var color_calendar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(color_calendar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var color_calendar_dist_css_theme_glass_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! color-calendar/dist/css/theme-glass.css */ "./node_modules/color-calendar/dist/css/theme-glass.css");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addMonths/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfMonth/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_dates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/dates */ "./src/helpers/dates.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.css */ "./src/calendar/styles.css");






/**
 * Constants
 */

const LoaderId = 'loaderBalls';
/**
 * Calendar Controller
 */

class CalendarController {
  #placeHolderID;
  #initialised;
  #request;
  #cached;
  #onDayChangeCb;

  constructor(placeHolderID, request, onDayChangeCb) {
    // Store requested weeks
    this.#cached = {};
    this.#request = request;
    this.#onDayChangeCb = onDayChangeCb;
    this.#initialised = false;
    this.#placeHolderID = placeHolderID;
    const newLocal = this;
    newLocal.calendar = new (color_calendar__WEBPACK_IMPORTED_MODULE_0___default())({
      id: `#${placeHolderID}`,
      theme: 'glass',
      weekdayType: 'long-upper',
      startWeekday: 1,
      monthDisplayType: 'long',
      primaryColor: '#2aae75',
      fontFamilyHeader: 'Poppins, sans-serif',
      fontFamilyWeekdays: 'Poppins, sans-serif',
      fontFamilyBody: 'Poppins, sans-serif',
      calendarSize: 'large',
      layoutModifiers: ['month-left-align'],
      dropShadow: '',
      dateChanged: this.onDateChange,
      monthChanged: this.onMonthChange
    }); // Add loading animation

    this.addLoadingAnimation();
  }

  async init() {
    this.#initialised = true; // In case of no dates available in the current month, skip to the next one

    if (this.calendar.getEventsData().length === 0) {
      const curr = new Date();
      const next = (0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])(curr, 1);
      await this.getMonthAvailability(next);
    }

    const slots = lodash__WEBPACK_IMPORTED_MODULE_2___default().sortBy(this.calendar.getEventsData(), 'start');

    if (slots?.length > 0) this.calendar.setDate(slots[0]?.start);
  }
  /**
   * Load more dates
   */


  onMonthChange = async currentDate => {
    const firstDay = (0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(currentDate);
    await this.getMonthAvailability(firstDay);
    if (!this.#initialised) this.init();
  };
  /**
   * Load slots into view
   * @param {*} currentDate
   * @param {*} events
   */
  // eslint-disable-next-line class-methods-use-this

  onDateChange = (currentDate, events) => {
    this.#onDayChangeCb(currentDate, events);
  };
  /**
   * Start or stop loading animation
   */
  // eslint-disable-next-line class-methods-use-this

  toggleLoading(isVisible) {
    const loader = document.getElementById(LoaderId);
    loader && (loader.style.visibility = isVisible ? 'visible' : 'hidden');
  }
  /**
   * Create a hidden loading animation to be called in monthChange
   */
  // eslint-disable-next-line class-methods-use-this


  addLoadingAnimation() {
    // Add loading animation
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.id = LoaderId;
    loader.style.visibility = 'visible';
    loader.innerHTML = `
            <span class="loader__element"></span>
        `;
    document.getElementsByClassName('calendar__monthyear')[0].appendChild(loader);
  }

  async getMonthAvailability(startDate) {
    this.toggleLoading(true);
    await Promise.all((0,_helpers_dates__WEBPACK_IMPORTED_MODULE_3__.getMondays)(startDate).map(monday => this.getAvailability(monday)));
    this.toggleLoading();
  }
  /**
   * Get Availability
   */


  async getAvailability(weekStartDate) {
    const weekKey = (0,_helpers_dates__WEBPACK_IMPORTED_MODULE_3__.toISOStringShort)(weekStartDate);
    if (weekStartDate < new Date() || this.#cached[weekKey]) return;
    this.#cached[weekKey] = true;
    const url = new URL('https://inplace-booking.azurewebsites.net/api/availability');
    const params = new URLSearchParams({
      code: 'jDlOk9eyca7HVUuVn2fRaIDQmv57z9l8bCHssUSMzpDugndIrzi5Tw==',
      postalCode: this.#request.postalCode,
      duration: this.#request.duration,
      recurrence: this.#request.recurrence,
      weekSearchDate: (0,_helpers_dates__WEBPACK_IMPORTED_MODULE_3__.toISOStringShort)(weekStartDate)
    });
    url.search = params;
    const res = await fetch(url);
    const avail = await res.json(); // console.log(JSON.stringify(avail, null, 2))

    const slotToEvent = slot => {
      // Only add if it's still the same month as start of the week
      // to avoid infinity loop with monthChanged event, which is triggered
      // when a new event is added
      if (new Date(slot.start_time).getMonth() !== weekStartDate.getMonth()) return; // eslint-disable-next-line consistent-return

      return {
        start: new Date(slot.start_time),
        end: new Date(slot.end_time),
        start_time: slot.label,
        employee: {
          id: slot.affiliate_worker.worker_contract_id,
          first_name: slot.affiliate_worker.first_name,
          last_name: slot.affiliate_worker.last_name,
          allergies: slot.affiliate_worker.allergies
        }
      };
    };

    const newEvents = lodash__WEBPACK_IMPORTED_MODULE_2___default().compact(avail?.data?.map(dateAvail => dateAvail.time_slots.map(slot => slotToEvent(slot))).flat());

    newEvents.length > 0 && this.calendar.addEventsData(newEvents);
  }

}

/***/ }),

/***/ "./src/helpers/dates.js":
/*!******************************!*\
  !*** ./src/helpers/dates.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMondays": function() { return /* binding */ getMondays; },
/* harmony export */   "toISOStringShort": function() { return /* binding */ toISOStringShort; }
/* harmony export */ });
/**
 * Return all mondays of the month
 * @param {*} date
 * @returns
 */
const getMondays = date => {
  const d = date ? new Date(date.getTime()) : new Date();
  const month = d.getMonth();
  const mondays = [];
  d.setDate(1); // Get all the other Mondays in the month

  while (d.getMonth() === month) {
    mondays.push(new Date(d.getTime()));
    d.setDate(d.getDate() + 7);
  }

  return mondays;
};
/**
 * Return YYYY-MM-DD
 */


const toISOStringShort = date => new Date(date).toISOString().slice(0, 10);


/***/ }),

/***/ "./src/booking/slider.css":
/*!********************************!*\
  !*** ./src/booking/slider.css ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/booking/style.css":
/*!*******************************!*\
  !*** ./src/booking/style.css ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/calendar/styles.css":
/*!*********************************!*\
  !*** ./src/calendar/styles.css ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/vivify.css":
/*!************************!*\
  !*** ./src/vivify.css ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"Booking": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkui_booking"] = self["webpackChunkui_booking"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/booking/main.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=Booking.bundle.js.map