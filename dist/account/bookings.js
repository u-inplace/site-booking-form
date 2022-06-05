/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  !*** ./src/account/packages/bookings.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_dates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/dates */ "./src/helpers/dates.js");
/* eslint-disable vars-on-top */

/* eslint-disable no-var */

class BookingsController {
  /** @type {import('../types/memberstack').Member} */
  member;
  /**
   * Initialize controller
   */

  async init() {
    // Wait for MemberStack
    // eslint-disable-next-line no-undef
    const member = await MemberStack.onReady;
    this.member = member;
    this.load();
  }
  /**
   * Fetch and load bookings
   */


  async load() {
    // Fetch bookings for the upcoming 3 months
    const dateFrom = new Date();
    const dateTo = new Date(dateFrom.setMonth(dateFrom.getMonth() + 3));
    const bookings = await this.fetch(dateFrom, dateTo);
    console.log(JSON.stringify(bookings));
  }
  /**
   * Fetch bookings for user within date range
   * @param {Date} dateFrom
   * @param {Date} dateTo
   * @returns {import('../types/bookings').BookingsReadResponse}
   */


  async fetch(dateFrom, dateTo) {
    const fromStr = (0,_helpers_dates__WEBPACK_IMPORTED_MODULE_0__.toISOStringShort)(dateFrom);
    const toStr = (0,_helpers_dates__WEBPACK_IMPORTED_MODULE_0__.toISOStringShort)(dateTo);
    const customer = this.member['pootsy-id'];
    let bookings = {};

    try {
      const url = new URL('https://blue.inplace.be/api/bookings');
      const params = new URLSearchParams({
        code: 'X0XQCODICDXlLbCRdgVHLlN7C-lNWRZ_DOZmJJkxyAj5AzFu3r05kw==',
        customer: Number(customer),
        fromDate: fromStr,
        toDate: toStr
      });
      url.search = params;
      bookings = await fetch(url);
    } catch (err) {
      console.error(err);
    }

    return bookings;
  }

} // eslint-disable-next-line no-use-before-define


var Webflow = Webflow || window.Webflow || [];
Webflow.push(() => {
  const controller = new BookingsController();
  controller.init();
});
}();
/******/ })()
;
//# sourceMappingURL=bookings.js.map