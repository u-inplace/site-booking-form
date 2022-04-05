var Calendar;
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/calendar/styles.css":
/*!*********************************!*\
  !*** ./src/calendar/styles.css ***!
  \*********************************/
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
/******/ 			"Calendar": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkCalendar"] = self["webpackChunkCalendar"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/calendar/main.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	Calendar = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Calendar.bundle.js.map