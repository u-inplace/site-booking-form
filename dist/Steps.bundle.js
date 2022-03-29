/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var Steps;
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/steps/main.js":
/*!***************************!*\
  !*** ./src/steps/main.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n\n\n\n\nvar _steps;\n\n/**\n * Helper file for webflow inplace.be booking_\n */\nvar STEP = {\n  Services: 1,\n  Ironing: 2,\n  Cleaning: {\n    Info: 3,\n    Home: 4,\n    Extras: 5,\n    Supplies: 6\n  },\n  Duration: 7,\n  Frequency: 8,\n  Availability: 9,\n  Contact: 10\n};\nvar SERVICE = {\n  Cleaning: 'cleaning',\n  Ironing: 'ironing',\n  Cooking: 'cooking',\n  Grocery: 'grocery'\n};\nvar EXTRA = {\n  Windows: 'windows',\n  Cabinets: 'cabinets',\n  Fridge: 'fridge',\n  Oven: 'oven'\n};\n/**\n * Helpers\n **/\n\nvar queryOptions = function queryOptions(id) {\n  var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  return Array.from(document.querySelectorAll(\"input[id*='\".concat(id, \"']\").concat(checked ? ':checked' : '')));\n};\n\nvar getOption = function getOption(id) {\n  var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  return document.querySelector(\"input[id*='\".concat(id, \"']\").concat(checked ? ':checked' : ''));\n};\n\nvar queryRadio = function queryRadio(name) {\n  var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  return Array.from(document.querySelectorAll(\"input[name*='\".concat(name, \"']\").concat(checked ? ':checked' : '')));\n};\n\nvar getRadio = function getRadio(name) {\n  var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  return document.querySelector(\"input[name*=\\\"\".concat(name, \"\\\"]\").concat(checked ? ':checked' : ''));\n};\n\nvar setNextButtonDisabled = function setNextButtonDisabled(isDisabled) {\n  var nextButtonList = document.querySelectorAll('.next-button-slide');\n  Array.from(nextButtonList).forEach(function (nextButton) {\n    nextButton.disabled = isDisabled;\n    isDisabled ? nextButton.classList.add('disabled') : nextButton.classList.remove('disabled');\n  });\n};\n/**\n * STEP: Services\n **/\n\n\nvar queryServices = function queryServices() {\n  var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return queryOptions('service-', checked);\n};\n\nvar getSelectedServices = function getSelectedServices() {\n  return queryServices(true).map(function (s) {\n    return s.id.replace(/^.*-/, '');\n  });\n};\n\nvar isServiceSelected = function isServiceSelected(service) {\n  return _.includes(getSelectedServices(), service);\n};\n/**\n * STEP: Ironing\n */\n\n\nvar getSelectedIroning = function getSelectedIroning() {\n  var _getRadio, _getRadio$value;\n\n  return (_getRadio = getRadio('ironing-size', true)) === null || _getRadio === void 0 ? void 0 : (_getRadio$value = _getRadio.value) === null || _getRadio$value === void 0 ? void 0 : _getRadio$value.replace(/^ironing-size-/, '');\n};\n/**\n * STEP: Cleaning - Extras\n **/\n\n\nvar queryCleaningExtras = function queryCleaningExtras() {\n  var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return queryOptions('extra-', checked);\n};\n\nvar getSelectedCleaningExtras = function getSelectedCleaningExtras() {\n  return queryCleaningExtras(true).map(function (s) {\n    return s.id.replace(/^.*-/, '');\n  });\n};\n\nvar isExtraSelected = function isExtraSelected(extra) {\n  return _.includes(getSelectedCleaningExtras(), extra);\n};\n/**\n * STEP: Cleaning - Home\n **/\n\n\nvar isBedroomSelected = function isBedroomSelected() {\n  return getRadio('home-bedrooms', true);\n};\n\nvar isBathroomSelected = function isBathroomSelected() {\n  return getRadio('home-bathrooms', true);\n};\n/***\n * STEPS CONFIGURATION\n ***/\n\n\nvar StepConfig = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function StepConfig(isNextDisabled, getObserved) {\n  var getDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {\n    return 0;\n  };\n  var event = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'change';\n\n  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, StepConfig);\n\n  this.isNextDisabled = isNextDisabled;\n  this.getObserved = getObserved;\n  this.getDuration = getDuration;\n  this.event = event;\n});\n\nvar steps = (_steps = {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_steps, STEP.Services, new StepConfig(function () {\n  return getSelectedServices().length === 0;\n}, function () {\n  return queryServices();\n}, function () {\n  var services = getSelectedServices();\n  var total = 0;\n\n  if (services.length > 1) {\n    total += isServiceSelected(SERVICE.Cooking) ? 0.5 : 0;\n    total += isServiceSelected(SERVICE.Grocery) ? 0.5 : 0;\n  }\n\n  return total;\n})), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_steps, STEP.Ironing, new StepConfig(function () {\n  return !getSelectedIroning();\n}, function () {\n  return queryOptions('ironing-size');\n}, function () {\n  if (!isServiceSelected(SERVICE.Ironing)) return 0;else {\n    switch (getSelectedIroning()) {\n      case 'xs':\n        return 0.5;\n\n      case 's':\n        return 1;\n\n      case 'm':\n        return 2;\n\n      case 'l':\n        return 3;\n\n      case 'xl':\n        return 4;\n\n      default:\n        return 0;\n    }\n  }\n}, 'click')), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_steps, STEP.Cleaning.Info, new StepConfig(function () {\n  return false;\n}, function () {\n  return [];\n})), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_steps, STEP.Cleaning.Extras, new StepConfig(function () {\n  return false;\n}, function () {\n  return queryCleaningExtras();\n}, function () {\n  if (!isServiceSelected(SERVICE.Cleaning)) return 0;else {\n    var services = getSelectedCleaningExtras();\n    var total = isExtraSelected(EXTRA.Windows) ? 1 : 0;\n    total += isExtraSelected(EXTRA.Cabinets) ? 1 : 0;\n    total += isExtraSelected(EXTRA.Fridge) ? 0.5 : 0;\n    total += isExtraSelected(EXTRA.Oven) ? 0.5 : 0;\n    return total;\n  }\n})), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_steps, STEP.Cleaning.Home, new StepConfig(function () {\n  return !isBedroomSelected() || !isBathroomSelected();\n}, function () {\n  return queryRadio('home-');\n}, function () {\n  if (!isServiceSelected(SERVICE.Cleaning)) return 0;else {\n    var _getRadio2, _getRadio3;\n\n    var bedroom = (_getRadio2 = getRadio('home-bedrooms', true)) === null || _getRadio2 === void 0 ? void 0 : _getRadio2.value;\n    var bathroom = (_getRadio3 = getRadio('home-bathrooms', true)) === null || _getRadio3 === void 0 ? void 0 : _getRadio3.value;\n    var total = 0;\n\n    switch (bedroom) {\n      case '3':\n      case '4':\n        total += 1;\n        break;\n\n      case '5+':\n        total += 2;\n        break;\n\n      default:\n        break;\n    }\n\n    switch (bathroom) {\n      case '2':\n        total += 1;\n        break;\n\n      case '3':\n        total += 2;\n        break;\n\n      case '4+':\n        total += 3;\n        break;\n\n      default:\n        break;\n    }\n\n    return total;\n  }\n})), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_steps, STEP.Frequency, new StepConfig(function () {\n  return !getRadio('frequency', true);\n}, function () {\n  return queryRadio('frequency');\n}, function () {\n  return 0;\n}, 'click')), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_steps, STEP.Cleaning.Supplies, new StepConfig(function () {\n  return !getOption('supplies-conf', true);\n}, function () {\n  return queryOptions('supplies-conf');\n})), _steps);\n/**\n * Estimation calc\n */\n\nvar getEstimation = function getEstimation() {\n  return Math.floor(Object.values(steps).reduce(function (acc, s, i) {\n    console.log(\"Estimation Step \".concat(i + 1, \": \").concat(s ? s === null || s === void 0 ? void 0 : s.getDuration() : 0));\n    acc += s ? s.getDuration() : 0;\n    return acc;\n  }, 3.0));\n};\n\nvar setEstimation = function setEstimation(estimation) {\n  document.getElementById('duration').nextElementSibling.noUiSlider.set(estimation);\n};\n/**\n * Add handlers\n */\n\n\nvar Webflow = Webflow || [];\nWebflow.push(function () {\n  var Sequence = /*#__PURE__*/function () {\n    function Sequence() {\n      (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Sequence);\n\n      this._current = 0;\n      var seq = [STEP.Services];\n      if (isServiceSelected(SERVICE.Ironing)) seq.push(STEP.Ironing);\n      if (isServiceSelected(SERVICE.Cleaning)) seq = seq.concat(Object.values(STEP.Cleaning).map(function (e) {\n        return e;\n      }));\n      seq = seq.concat([STEP.Duration, STEP.Frequency, STEP.Availability, STEP.Contact]);\n      this.list = seq;\n    }\n\n    (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Sequence, [{\n      key: \"next\",\n      get: function get() {\n        this._current++;\n        console.log(\"Seq : \".concat(this.list, \" ; curr : \").concat(this._current));\n        return this.list[this._current] - 1;\n      }\n    }, {\n      key: \"prev\",\n      get: function get() {\n        this._current--;\n        console.log(\"Seq : \".concat(this.list, \" ; curr : \").concat(this._current));\n        return this.list[this._current] - 1;\n      }\n    }, {\n      key: \"total\",\n      get: function get() {\n        return this.list.length;\n      }\n    }, {\n      key: \"current\",\n      get: function get() {\n        return this._current + 1;\n      }\n    }]);\n\n    return Sequence;\n  }();\n\n  var toggleNext = function toggleNext() {\n    var _steps$slider$current;\n\n    var isDisabled = (_steps$slider$current = steps[slider.current()]) === null || _steps$slider$current === void 0 ? void 0 : _steps$slider$current.isNextDisabled();\n    setNextButtonDisabled(isDisabled);\n  };\n\n  var setStepNav = function setStepNav(seq) {\n    document.getElementsByClassName('step-number')[slider.current() - 1].innerHTML = \"Step \".concat(seq.current, \"/\").concat(seq.current === 1 ? '-' : seq.total);\n  };\n\n  var slider = new W_SLIDER_CONTROLLER('#booking-slider'); // Handle step validations\n\n  setNextButtonDisabled(true); // Setup event handlers\n\n  Object.values(steps).forEach(function (s) {\n    s.getObserved().forEach(function (o) {\n      o.checked = false;\n      o.addEventListener(s.event, toggleNext);\n    });\n  });\n  var sequence = {};\n\n  var onNext = function onNext() {\n    if (slider.current() === STEP.Services) sequence = new Sequence();\n    var next = sequence.next;\n    slider[\"goto\"](next);\n    setStepNav(sequence);\n\n    switch (slider.current()) {\n      case STEP.Duration:\n        // slider.current already points to the next slide\n        var estimation = getEstimation();\n        setEstimation(estimation);\n        console.log(estimation);\n        break;\n\n      default:\n        toggleNext();\n        break;\n    }\n  };\n\n  var onBack = function onBack() {\n    var prev = sequence.prev;\n    slider[\"goto\"](prev);\n    setStepNav(sequence);\n    toggleNext();\n  };\n\n  $('#booking-slider').on('click', '.next-button-slide', onNext).on('click', '.back-button-slide', onBack);\n});\n\n//# sourceURL=webpack://%5Bname%5D/./src/steps/main.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _classCallCheck; }\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/esm/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _createClass; }\n/* harmony export */ });\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  Object.defineProperty(Constructor, \"prototype\", {\n    writable: false\n  });\n  return Constructor;\n}\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/esm/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _defineProperty; }\n/* harmony export */ });\nfunction _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@babel/runtime/helpers/esm/defineProperty.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/steps/main.js");
/******/ 	Steps = __webpack_exports__;
/******/ 	
/******/ })()
;