/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/booking-flow/controllers/step.js":
/*!**********************************************!*\
  !*** ./src/booking-flow/controllers/step.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ StepController; }
/* harmony export */ });
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking-flow/helpers/dom.js");

class StepController {
  /**
   * @type {HTMLFormElement}
   */
  form;
  /**
   * Create new StepController
   * @param {string} formId Step form Id
   */

  constructor(formId = 'step-form') {
    this.form = _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id(formId);
  }
  /**
   * Initialize controller
   */


  init() {
    this.setupInputHandlers();
    _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].nextButtonDisabled = true;
    this.toggleNext();
  }
  /**
   * Create event handlers
   */


  setupInputHandlers() {
    this.form.querySelectorAll('input').forEach(input => {
      const event = input.type === 'radio' ? 'click' : 'change';
      input.addEventListener(event, this.toggleNext.bind(this));
    });
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

}

/***/ }),

/***/ "./src/booking-flow/helpers/dom.js":
/*!*****************************************!*\
  !*** ./src/booking-flow/helpers/dom.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
    const toastBlock = document.getElementById(id);
    toastBlock.classList.add('active');
    return setTimeout(() => {
      toastBlock.classList.remove('active');
    }, 1000 * 4);
  }

  static set nextButtonDisabled(isDisabled) {
    const nextButton = document.querySelector('.next-button-flow');
    nextButton.disabled = isDisabled;
    if (isDisabled) nextButton.classList.add('disabled');else nextButton.classList.remove('disabled');
  }

}

const dom = Dom;
/* harmony default export */ __webpack_exports__["default"] = (dom);

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
/*!*************************************************!*\
  !*** ./src/booking-flow/packages/postalCode.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vivify_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../vivify.css */ "./src/vivify.css");
/* harmony import */ var _controllers_step__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/step */ "./src/booking-flow/controllers/step.js");
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking-flow/helpers/dom.js");
/* eslint-disable class-methods-use-this */

/* eslint-disable vars-on-top */

/* eslint-disable no-use-before-define */

/* eslint-disable no-var */




class PostalCodeStep extends _controllers_step__WEBPACK_IMPORTED_MODULE_1__["default"] {
  coverage = ['1070', '1160', '1082', '1000', '1040', '1140', '1190', '1083', '1130', '1050', '1090', '1081', '1020', '1080', '1120', '1060', '1210', '1030', '1180', '1170', '1200', '1150'];

  init() {
    super.init();
    this.pc.addEventListener('input', this.onPostalCode.bind(this));
  }

  get isNextDisabled() {
    const {
      pc
    } = this;
    const {
      value
    } = pc;
    return !this.coverage.includes(value);
  }

  get pc() {
    return _helpers_dom__WEBPACK_IMPORTED_MODULE_2__["default"].id('postal-code');
  }

  onPostalCode(e) {
    const pc = e.target;
    const {
      value
    } = pc; // show error message

    if (value.length === pc.maxLength && !this.coverage.includes(value)) {
      // Scroll back to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      _helpers_dom__WEBPACK_IMPORTED_MODULE_2__["default"].toast('alert-area');
    }
  }

}

var Webflow = Webflow || window.Webflow || [];
Webflow.push(() => {
  const step = new PostalCodeStep();
  step.init();
});
}();
/******/ })()
;
//# sourceMappingURL=StepPostalCode.js.map