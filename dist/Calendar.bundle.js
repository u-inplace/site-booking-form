var Calendar;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/color-calendar/dist/bundle.js":
/*!****************************************************!*\
  !*** ./node_modules/color-calendar/dist/bundle.js ***!
  \****************************************************/
/***/ (function(module) {

/**
 * color-calendar
 * v1.0.6
 * by Pawan Kolhe <contact@pawankolhe.com> (https://pawankolhe.com/)
 */
!function (e, t) {
   true ? module.exports = t() : 0;
}(this, function () {
  "use strict";

  class e {
    constructor(e = {}) {
      var t, a, i, r, n, s, o, l, d, c, h, y, p;
      if (this.CAL_NAME = "color-calendar", this.DAYS_TO_DISPLAY = 42, this.weekdayDisplayTypeOptions = {
        short: ["S", "M", "T", "W", "T", "F", "S"],
        "long-lower": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "long-upper": ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
      }, this.id = null !== (t = e.id) && void 0 !== t ? t : "#color-calendar", this.calendarSize = null !== (a = e.calendarSize) && void 0 !== a ? a : "large", this.layoutModifiers = null !== (i = e.layoutModifiers) && void 0 !== i ? i : [], this.eventsData = null !== (r = e.eventsData) && void 0 !== r ? r : [], this.theme = null !== (n = e.theme) && void 0 !== n ? n : "basic", this.primaryColor = e.primaryColor, this.headerColor = e.headerColor, this.headerBackgroundColor = e.headerBackgroundColor, this.weekdaysColor = e.weekdaysColor, this.weekdayDisplayType = null !== (s = e.weekdayDisplayType) && void 0 !== s ? s : "long-lower", this.monthDisplayType = null !== (o = e.monthDisplayType) && void 0 !== o ? o : "long", this.startWeekday = null !== (l = e.startWeekday) && void 0 !== l ? l : 0, this.fontFamilyHeader = e.fontFamilyHeader, this.fontFamilyWeekdays = e.fontFamilyWeekdays, this.fontFamilyBody = e.fontFamilyBody, this.dropShadow = e.dropShadow, this.border = e.border, this.borderRadius = e.borderRadius, this.disableMonthYearPickers = null !== (d = e.disableMonthYearPickers) && void 0 !== d && d, this.disableDayClick = null !== (c = e.disableDayClick) && void 0 !== c && c, this.disableMonthArrowClick = null !== (h = e.disableMonthArrowClick) && void 0 !== h && h, this.customMonthValues = e.customMonthValues, this.customWeekdayValues = e.customWeekdayValues, this.monthChanged = e.monthChanged, this.dateChanged = e.dateChanged, this.selectedDateClicked = e.selectedDateClicked, this.customWeekdayValues && 7 === this.customWeekdayValues.length ? this.weekdays = this.customWeekdayValues : this.weekdays = null !== (y = this.weekdayDisplayTypeOptions[this.weekdayDisplayType]) && void 0 !== y ? y : this.weekdayDisplayTypeOptions.short, this.today = new Date(), this.currentDate = new Date(), this.pickerType = "month", this.eventDayMap = {}, this.oldSelectedNode = null, this.filteredEventsThisMonth = [], this.daysIn_PrevMonth = [], this.daysIn_CurrentMonth = [], this.daysIn_NextMonth = [], this.firstDay_PrevMonth = 0, this.firstDay_CurrentMonth = 0, this.firstDay_NextMonth = 0, this.numOfDays_PrevMonth = 0, this.numOfDays_CurrentMonth = 0, this.numOfDays_NextMonth = 0, this.yearPickerOffset = 0, this.yearPickerOffsetTemporary = 0, this.calendar = document.querySelector(this.id), !this.calendar) throw new Error(`[COLOR-CALENDAR] Element with selector '${this.id}' not found`);
      this.calendar.innerHTML = `\n      <div class="${this.CAL_NAME} ${this.theme} color-calendar--${this.calendarSize}">\n        <div class="calendar__header">\n          <div class="calendar__arrow calendar__arrow-prev"><div class="calendar__arrow-inner"></div></div>\n          <div class="calendar__monthyear">\n            <span class="calendar__month"></span>&nbsp;\n            <span class="calendar__year"></span>\n          </div>\n          <div class="calendar__arrow calendar__arrow-next"><div class="calendar__arrow-inner"></div></div>\n        </div>\n        <div class="calendar__body">\n          <div class="calendar__weekdays"></div>\n          <div class="calendar__days"></div>\n          <div class="calendar__picker">\n            <div class="calendar__picker-month">\n              ${(null !== (p = this.customMonthValues) && void 0 !== p ? p : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]).map((e, t) => `<div class="calendar__picker-month-option" data-value="${t}">${e}</div>`).join("")}\n            </div>\n            <div class="calendar__picker-year">\n              <div class="calendar__picker-year-option" data-value="0"></div>\n              <div class="calendar__picker-year-option" data-value="1"></div>\n              <div class="calendar__picker-year-option" data-value="2"></div>\n              <div class="calendar__picker-year-option" data-value="3"></div>\n              <div class="calendar__picker-year-option" data-value="4"></div>\n              <div class="calendar__picker-year-option" data-value="5"></div>\n              <div class="calendar__picker-year-option" data-value="6"></div>\n              <div class="calendar__picker-year-option" data-value="7"></div>\n              <div class="calendar__picker-year-option" data-value="8"></div>\n              <div class="calendar__picker-year-option" data-value="9"></div>\n              <div class="calendar__picker-year-option" data-value="10"></div>\n              <div class="calendar__picker-year-option" data-value="11"></div>\n              <div class="calendar__picker-year-arrow calendar__picker-year-arrow-left">\n                <div class="chevron-thin chevron-thin-left"></div>\n              </div>\n              <div class="calendar__picker-year-arrow calendar__picker-year-arrow-right">\n                <div class="chevron-thin chevron-thin-right"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    `, this.calendarRoot = document.querySelector(`${this.id} .${this.CAL_NAME}`), this.calendarHeader = document.querySelector(this.id + " .calendar__header"), this.calendarWeekdays = document.querySelector(this.id + " .calendar__weekdays"), this.calendarDays = document.querySelector(this.id + " .calendar__days"), this.pickerContainer = document.querySelector(this.id + " .calendar__picker"), this.pickerMonthContainer = document.querySelector(this.id + " .calendar__picker-month"), this.pickerYearContainer = document.querySelector(this.id + " .calendar__picker-year"), this.yearPickerChevronLeft = document.querySelector(this.id + " .calendar__picker-year-arrow-left"), this.yearPickerChevronRight = document.querySelector(this.id + " .calendar__picker-year-arrow-right"), this.pickerMonthContainer.children[this.today.getMonth()].classList.add("calendar__picker-month-today"), this.layoutModifiers.forEach(e => {
        this.calendarRoot.classList.add(e);
      }), this.layoutModifiers.includes("month-left-align") && (this.calendarHeader.innerHTML = '\n        <div class="calendar__monthyear">\n          <span class="calendar__month"></span>&nbsp;\n          <span class="calendar__year"></span>\n        </div>\n        <div class="calendar__arrow calendar__arrow-prev"><div class="calendar__arrow-inner"></div></div>\n        <div class="calendar__arrow calendar__arrow-next"><div class="calendar__arrow-inner"></div></div>\n      '), this.monthyearDisplay = document.querySelector(this.id + " .calendar__monthyear"), this.monthDisplay = document.querySelector(this.id + " .calendar__month"), this.yearDisplay = document.querySelector(this.id + " .calendar__year"), this.prevButton = document.querySelector(this.id + " .calendar__arrow-prev .calendar__arrow-inner"), this.nextButton = document.querySelector(this.id + " .calendar__arrow-next .calendar__arrow-inner"), this.togglePicker(!1), this.configureStylePreferences(), this.addEventListeners(), this.reset(new Date());
    }

    reset(e) {
      this.currentDate = e || new Date(), this.clearCalendarDays(), this.updateMonthYear(), this.updateMonthPickerSelection(this.currentDate.getMonth()), this.generatePickerYears(), this.updateYearPickerSelection(this.currentDate.getFullYear(), 4), this.updateYearPickerTodaySelection(), this.generateWeekdays(), this.generateDays(), this.selectDayInitial(!!e), this.renderDays(), this.setOldSelectedNode(), this.dateChanged && this.dateChanged(this.currentDate, this.getDateEvents(this.currentDate)), this.monthChanged && this.monthChanged(this.currentDate, this.getMonthEvents());
    }

  }

  return e.prototype.addEventListeners = function () {
    this.prevButton.addEventListener("click", this.handlePrevMonthButtonClick.bind(this)), this.nextButton.addEventListener("click", this.handleNextMonthButtonClick.bind(this)), this.monthyearDisplay.addEventListener("click", this.handleMonthYearDisplayClick.bind(this)), this.calendarDays.addEventListener("click", this.handleCalendarDayClick.bind(this)), this.pickerMonthContainer.addEventListener("click", this.handleMonthPickerClick.bind(this)), this.pickerYearContainer.addEventListener("click", this.handleYearPickerClick.bind(this)), this.yearPickerChevronLeft.addEventListener("click", this.handleYearChevronLeftClick.bind(this)), this.yearPickerChevronRight.addEventListener("click", this.handleYearChevronRightClick.bind(this));
  }, e.prototype.configureStylePreferences = function () {
    let e = this.calendarRoot;
    this.primaryColor && e.style.setProperty("--cal-color-primary", this.primaryColor), this.fontFamilyHeader && e.style.setProperty("--cal-font-family-header", this.fontFamilyHeader), this.fontFamilyWeekdays && e.style.setProperty("--cal-font-family-weekdays", this.fontFamilyWeekdays), this.fontFamilyBody && e.style.setProperty("--cal-font-family-body", this.fontFamilyBody), this.dropShadow && e.style.setProperty("--cal-drop-shadow", this.dropShadow), this.border && e.style.setProperty("--cal-border", this.border), this.borderRadius && e.style.setProperty("--cal-border-radius", this.borderRadius), this.headerColor && e.style.setProperty("--cal-header-color", this.headerColor), this.headerBackgroundColor && e.style.setProperty("--cal-header-background-color", this.headerBackgroundColor), this.weekdaysColor && e.style.setProperty("--cal-weekdays-color", this.weekdaysColor);
  }, e.prototype.togglePicker = function (e) {
    !0 === e ? (this.pickerContainer.style.visibility = "visible", this.pickerContainer.style.opacity = "1", "year" === this.pickerType && this.generatePickerYears(), this.removeYearPickerSelection(), this.updateYearPickerSelection(this.currentDate.getFullYear())) : !1 === e ? (this.pickerContainer.style.visibility = "hidden", this.pickerContainer.style.opacity = "0", this.monthDisplay && this.yearDisplay && (this.monthDisplay.style.opacity = "1", this.yearDisplay.style.opacity = "1"), this.yearPickerOffsetTemporary = 0) : "hidden" === this.pickerContainer.style.visibility ? (this.pickerContainer.style.visibility = "visible", this.pickerContainer.style.opacity = "1", "year" === this.pickerType && this.generatePickerYears(), this.removeYearPickerSelection(), this.updateYearPickerSelection(this.currentDate.getFullYear())) : (this.pickerContainer.style.visibility = "hidden", this.pickerContainer.style.opacity = "0", this.monthDisplay && this.yearDisplay && (this.monthDisplay.style.opacity = "1", this.yearDisplay.style.opacity = "1"), this.yearPickerOffsetTemporary = 0);
  }, e.prototype.handleMonthPickerClick = function (e) {
    if (!e.target.classList.contains("calendar__picker-month-option")) return;
    const t = parseInt(e.target.dataset.value, 10);
    this.updateMonthPickerSelection(t), this.updateCurrentDate(0, void 0, t), this.togglePicker(!1);
  }, e.prototype.updateMonthPickerSelection = function (e) {
    e < 0 ? e = 11 : e %= 12, this.removeMonthPickerSelection(), this.pickerMonthContainer.children[e].classList.add("calendar__picker-month-selected");
  }, e.prototype.removeMonthPickerSelection = function () {
    for (let e = 0; e < 12; e++) this.pickerMonthContainer.children[e].classList.contains("calendar__picker-month-selected") && this.pickerMonthContainer.children[e].classList.remove("calendar__picker-month-selected");
  }, e.prototype.handleYearPickerClick = function (e) {
    if (!e.target.classList.contains("calendar__picker-year-option")) return;
    this.yearPickerOffset += this.yearPickerOffsetTemporary;
    const t = parseInt(e.target.innerText),
          a = parseInt(e.target.dataset.value);
    this.updateYearPickerSelection(t, a), this.updateCurrentDate(0, void 0, void 0, t), this.togglePicker(!1);
  }, e.prototype.updateYearPickerSelection = function (e, t) {
    if (void 0 === t) {
      for (let a = 0; a < 12; a++) {
        let i = this.pickerYearContainer.children[a];

        if (parseInt(i.innerHTML) === e && i.dataset.value) {
          t = parseInt(i.dataset.value);
          break;
        }
      }

      if (void 0 === t) return;
    }

    this.removeYearPickerSelection(), this.pickerYearContainer.children[t].classList.add("calendar__picker-year-selected");
  }, e.prototype.updateYearPickerTodaySelection = function () {
    parseInt(this.pickerYearContainer.children[4].innerHTML) === this.today.getFullYear() ? this.pickerYearContainer.children[4].classList.add("calendar__picker-year-today") : this.pickerYearContainer.children[4].classList.remove("calendar__picker-year-today");
  }, e.prototype.removeYearPickerSelection = function () {
    for (let e = 0; e < 12; e++) this.pickerYearContainer.children[e].classList.contains("calendar__picker-year-selected") && this.pickerYearContainer.children[e].classList.remove("calendar__picker-year-selected");
  }, e.prototype.generatePickerYears = function () {
    const e = this.today.getFullYear() + this.yearPickerOffset + this.yearPickerOffsetTemporary;
    let t = 0;

    for (let a = e - 4; a <= e + 7; a++) {
      this.pickerYearContainer.children[t].innerText = a.toString(), t++;
    }

    this.updateYearPickerTodaySelection();
  }, e.prototype.handleYearChevronLeftClick = function () {
    this.yearPickerOffsetTemporary -= 12, this.generatePickerYears(), this.removeYearPickerSelection(), this.updateYearPickerSelection(this.currentDate.getFullYear()), this.updateYearPickerTodaySelection();
  }, e.prototype.handleYearChevronRightClick = function () {
    this.yearPickerOffsetTemporary += 12, this.generatePickerYears(), this.removeYearPickerSelection(), this.updateYearPickerSelection(this.currentDate.getFullYear()), this.updateYearPickerTodaySelection();
  }, e.prototype.setMonthDisplayType = function (e) {
    this.monthDisplayType = e, this.updateMonthYear();
  }, e.prototype.handleMonthYearDisplayClick = function (e) {
    if (!e.target.classList.contains("calendar__month") && !e.target.classList.contains("calendar__year")) return;
    if (this.disableMonthYearPickers) return;
    const t = this.pickerType,
          a = e.target.classList;
    a.contains("calendar__month") ? (this.pickerType = "month", this.monthDisplay.style.opacity = "1", this.yearDisplay.style.opacity = "0.7", this.pickerMonthContainer.style.display = "grid", this.pickerYearContainer.style.display = "none") : a.contains("calendar__year") && (this.pickerType = "year", this.monthDisplay.style.opacity = "0.7", this.yearDisplay.style.opacity = "1", this.pickerMonthContainer.style.display = "none", this.pickerYearContainer.style.display = "grid"), t === this.pickerType ? this.togglePicker() : this.togglePicker(!0);
  }, e.prototype.handlePrevMonthButtonClick = function () {
    if (this.disableMonthArrowClick) return;
    const e = this.currentDate.getMonth() - 1;
    this.currentDate.getFullYear() <= this.today.getFullYear() + this.yearPickerOffset - 4 && e < 0 && (this.yearPickerOffset -= 12, this.generatePickerYears()), e < 0 && this.updateYearPickerSelection(this.currentDate.getFullYear() - 1), this.updateMonthPickerSelection(e), this.updateCurrentDate(-1), this.togglePicker(!1);
  }, e.prototype.handleNextMonthButtonClick = function () {
    if (this.disableMonthArrowClick) return;
    const e = this.currentDate.getMonth() + 1;
    this.currentDate.getFullYear() >= this.today.getFullYear() + this.yearPickerOffset + 7 && e > 11 && (this.yearPickerOffset += 12, this.generatePickerYears()), e > 11 && this.updateYearPickerSelection(this.currentDate.getFullYear() + 1), this.updateMonthPickerSelection(e), this.updateCurrentDate(1), this.togglePicker(!1);
  }, e.prototype.updateMonthYear = function () {
    this.oldSelectedNode = null, this.customMonthValues ? this.monthDisplay.innerHTML = this.customMonthValues[this.currentDate.getMonth()] : this.monthDisplay.innerHTML = new Intl.DateTimeFormat("default", {
      month: this.monthDisplayType
    }).format(this.currentDate), this.yearDisplay.innerHTML = this.currentDate.getFullYear().toString();
  }, e.prototype.setWeekdayDisplayType = function (e) {
    var t;
    this.weekdayDisplayType = e, this.weekdays = null !== (t = this.weekdayDisplayTypeOptions[this.weekdayDisplayType]) && void 0 !== t ? t : this.weekdayDisplayTypeOptions.short, this.generateWeekdays();
  }, e.prototype.generateWeekdays = function () {
    let e = "";

    for (let t = 0; t < 7; t++) e += `\n      <div class="calendar__weekday">${this.weekdays[(t + this.startWeekday) % 7]}</div>\n    `;

    this.calendarWeekdays.innerHTML = e;
  }, e.prototype.setDate = function (e) {
    e && (e instanceof Date ? this.reset(e) : this.reset(new Date(e)));
  }, e.prototype.getSelectedDate = function () {
    return this.currentDate;
  }, e.prototype.clearCalendarDays = function () {
    this.daysIn_PrevMonth = [], this.daysIn_CurrentMonth = [], this.daysIn_NextMonth = [];
  }, e.prototype.updateCalendar = function (e) {
    e && (this.updateMonthYear(), this.clearCalendarDays(), this.generateDays(), this.selectDayInitial()), this.renderDays(), e && this.setOldSelectedNode();
  }, e.prototype.setOldSelectedNode = function () {
    if (!this.oldSelectedNode) {
      let e = void 0;

      for (let t = 1; t < this.calendarDays.childNodes.length; t += 2) {
        let a = this.calendarDays.childNodes[t];

        if (a.classList && a.classList.contains("calendar__day-active") && a.innerText === this.currentDate.getDate().toString()) {
          e = a;
          break;
        }
      }

      e && (this.oldSelectedNode = [e, parseInt(e.innerText)]);
    }
  }, e.prototype.selectDayInitial = function (e) {
    if (e) this.daysIn_CurrentMonth[this.currentDate.getDate() - 1].selected = !0;else {
      let e = this.today.getMonth() === this.currentDate.getMonth(),
          t = this.today.getDate() === this.currentDate.getDate();
      e && t ? this.daysIn_CurrentMonth[this.today.getDate() - 1].selected = !0 : this.daysIn_CurrentMonth[0].selected = !0;
    }
  }, e.prototype.handleCalendarDayClick = function (e) {
    if (!(e.target.classList.contains("calendar__day-box") || e.target.classList.contains("calendar__day-text") || e.target.classList.contains("calendar__day-box-today") || e.target.classList.contains("calendar__day-bullet"))) return;
    if (this.disableDayClick) return;
    if (this.oldSelectedNode && !this.oldSelectedNode[0]) return;
    if (e.target.parentElement.classList.contains("calendar__day-selected")) return void (this.selectedDateClicked && this.selectedDateClicked(this.currentDate, this.getDateEvents(this.currentDate)));
    let t, a;
    t = e.target.parentElement.innerText, a = parseInt(t, 10), this.removeOldDaySelection(), t && (this.updateCurrentDate(0, a), Object.assign(this.daysIn_CurrentMonth[a - 1], {
      selected: !0
    }), this.rerenderSelectedDay(e.target.parentElement, a, !0));
  }, e.prototype.removeOldDaySelection = function () {
    this.oldSelectedNode && (Object.assign(this.daysIn_CurrentMonth[this.oldSelectedNode[1] - 1], {
      selected: !1
    }), this.rerenderSelectedDay(this.oldSelectedNode[0], this.oldSelectedNode[1]));
  }, e.prototype.updateCurrentDate = function (e, t, a, i) {
    this.currentDate = new Date(i || this.currentDate.getFullYear(), null != a ? a : this.currentDate.getMonth() + e, 0 === e && t ? t : 1), (0 !== e || null != a || i) && (this.updateCalendar(!0), this.monthChanged && this.monthChanged(this.currentDate, this.getMonthEvents())), this.dateChanged && this.dateChanged(this.currentDate, this.getDateEvents(this.currentDate));
  }, e.prototype.generateDays = function () {
    this.numOfDays_PrevMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate(), this.firstDay_CurrentMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay(), this.numOfDays_CurrentMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();

    for (let e = 0; e < this.numOfDays_CurrentMonth; e++) this.daysIn_CurrentMonth.push({
      day: e + 1,
      selected: !1
    });
  }, e.prototype.renderDays = function () {
    let e = 0;
    const t = this.currentDate.getFullYear(),
          a = this.currentDate.getMonth();
    let i;
    this.filteredEventsThisMonth = this.eventsData.filter(e => {
      const i = new Date(e.start);
      return i.getFullYear() === t && i.getMonth() === a;
    }), this.eventDayMap = {}, this.filteredEventsThisMonth.forEach(e => {
      const t = new Date(e.start).getDate(),
            a = new Date(e.end).getDate();

      for (let e = t; e <= a; e++) this.eventDayMap[e] = !0;
    }), i = this.firstDay_CurrentMonth < this.startWeekday ? 7 + this.firstDay_CurrentMonth - this.startWeekday : this.firstDay_CurrentMonth - this.startWeekday;
    let r = "";

    for (let t = 0; t < i; t++) r += `\n      <div class="calendar__day calendar__day-other">${this.numOfDays_PrevMonth + 1 - i + t}</div>\n    `, e++;

    let n = this.today.getFullYear() === this.currentDate.getFullYear(),
        s = this.today.getMonth() === this.currentDate.getMonth() && n;
    this.daysIn_CurrentMonth.forEach(t => {
      let a = s && t.day === this.today.getDate();
      r += `\n      <div class="calendar__day calendar__day-active${a ? " calendar__day-today" : ""}${this.eventDayMap[t.day] ? " calendar__day-event" : " calendar__day-no-event"}${t.selected ? " calendar__day-selected" : ""}">\n        <span class="calendar__day-text">${t.day}</span>\n        <div class="calendar__day-bullet"></div>\n        <div class="calendar__day-box"></div>\n      </div>\n    `, e++;
    });

    for (let t = 0; t < this.DAYS_TO_DISPLAY - e; t++) r += `\n      <div class="calendar__day calendar__day-other">${t + 1}</div>\n    `;

    this.calendarDays.innerHTML = r;
  }, e.prototype.rerenderSelectedDay = function (e, t, a) {
    let i = e.previousElementSibling,
        r = this.today.getFullYear() === this.currentDate.getFullYear(),
        n = this.today.getMonth() === this.currentDate.getMonth() && r && t === this.today.getDate(),
        s = document.createElement("div");
    s.className += `calendar__day calendar__day-active${n ? " calendar__day-today" : ""}${this.eventDayMap[t] ? " calendar__day-event" : " calendar__day-no-event"}${this.daysIn_CurrentMonth[t - 1].selected ? " calendar__day-selected" : ""}`, s.innerHTML = `\n    <span class="calendar__day-text">${t}</span>\n    <div class="calendar__day-bullet"></div>\n    <div class="calendar__day-box"></div>\n  `, i ? i.parentElement ? i.parentElement.insertBefore(s, i.nextSibling) : console.log("Previous element does not have parent") : this.calendarDays.insertBefore(s, e), a && (this.oldSelectedNode = [s, t]), e.remove();
  }, e.prototype.getEventsData = function () {
    return JSON.parse(JSON.stringify(this.eventsData));
  }, e.prototype.setEventsData = function (e) {
    return this.eventsData = JSON.parse(JSON.stringify(e)), this.setDate(this.currentDate), this.eventsData.length;
  }, e.prototype.addEventsData = function (e = []) {
    const t = this.eventsData.push(...e);
    return this.setDate(this.currentDate), t;
  }, e.prototype.getDateEvents = function (e) {
    return this.filteredEventsThisMonth.filter(t => {
      const a = new Date(t.start).getDate(),
            i = new Date(t.end).getDate();
      return e.getDate() >= a && e.getDate() <= i;
    });
  }, e.prototype.getMonthEvents = function () {
    return this.filteredEventsThisMonth;
  }, e;
});

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ requiredArgs; }
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toInteger; }
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/addMonths/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/addMonths/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ addMonths; }
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */

function addMonths(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.

  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();

  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfMonth/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfMonth/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ startOfMonth; }
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfMonth(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toDate; }
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/***/ (function(module) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

module.exports = arrayMap;

/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.head([1, 2, 3]);
 * // => 1
 *
 * _.head([]);
 * // => undefined
 */
function head(array) {
  return array && array.length ? array[0] : undefined;
}

module.exports = head;

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/***/ (function(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ "./node_modules/lodash/_baseMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseMap.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

module.exports = arrayMap;

/***/ }),

/***/ "./node_modules/lodash/_baseOrderBy.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseOrderBy.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    baseMap = __webpack_require__(/*! ./_baseMap */ "./node_modules/lodash/_baseMap.js"),
    baseSortBy = __webpack_require__(/*! ./_baseSortBy */ "./node_modules/lodash/_baseSortBy.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    compareMultiple = __webpack_require__(/*! ./_compareMultiple */ "./node_modules/lodash/_compareMultiple.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");
/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */


function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function (iteratee) {
      if (isArray(iteratee)) {
        return function (value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }

      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
  var result = baseMap(collection, function (value, key, collection) {
    var criteria = arrayMap(iteratees, function (iteratee) {
      return iteratee(value);
    });
    return {
      'criteria': criteria,
      'index': ++index,
      'value': value
    };
  });
  return baseSortBy(result, function (object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */


function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),

/***/ "./node_modules/lodash/_baseSortBy.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseSortBy.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);

  while (length--) {
    array[length] = array[length].value;
  }

  return array;
}

module.exports = baseSortBy;

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ "./node_modules/lodash/_compareAscending.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_compareAscending.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");
/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */


function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);
    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }

    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }

  return 0;
}

module.exports = compareAscending;

/***/ }),

/***/ "./node_modules/lodash/_compareMultiple.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_compareMultiple.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var compareAscending = __webpack_require__(/*! ./_compareAscending */ "./node_modules/lodash/_compareAscending.js");
/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */


function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);

    if (result) {
      if (index >= ordersLength) {
        return result;
      }

      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  } // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.


  return object.index - other.index;
}

module.exports = compareMultiple;

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/***/ (function(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeMax = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ "./node_modules/lodash/compact.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/compact.js ***!
  \****************************************/
/***/ (function(module) {

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (value) {
      result[resIndex++] = value;
    }
  }

  return result;
}

module.exports = compact;

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ "./node_modules/lodash/sortBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/sortBy.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "./node_modules/lodash/_baseFlatten.js"),
    baseOrderBy = __webpack_require__(/*! ./_baseOrderBy */ "./node_modules/lodash/_baseOrderBy.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");
/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */


var sortBy = baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }

  var length = iteratees.length;

  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }

  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});
module.exports = sortBy;

/***/ }),

/***/ "./src/helpers/dates.js":
/*!******************************!*\
  !*** ./src/helpers/dates.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./node_modules/color-calendar/dist/css/theme-glass.css":
/*!**************************************************************!*\
  !*** ./node_modules/color-calendar/dist/css/theme-glass.css ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/calendar/styles.css":
/*!*********************************!*\
  !*** ./src/calendar/styles.css ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!******************************!*\
  !*** ./src/calendar/main.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CalendarController; }
/* harmony export */ });
/* harmony import */ var lodash_compact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/compact */ "./node_modules/lodash/compact.js");
/* harmony import */ var lodash_compact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_compact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/sortBy */ "./node_modules/lodash/sortBy.js");
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var color_calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! color-calendar */ "./node_modules/color-calendar/dist/bundle.js");
/* harmony import */ var color_calendar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(color_calendar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var color_calendar_dist_css_theme_glass_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! color-calendar/dist/css/theme-glass.css */ "./node_modules/color-calendar/dist/css/theme-glass.css");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addMonths/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfMonth/index.js");
/* harmony import */ var _helpers_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/dates */ "./src/helpers/dates.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.css */ "./src/calendar/styles.css");







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
    newLocal.calendar = new (color_calendar__WEBPACK_IMPORTED_MODULE_2___default())({
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
      const next = (0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(curr, 1);
      await this.getMonthAvailability(next);
    }

    const slots = lodash_sortBy__WEBPACK_IMPORTED_MODULE_1___default()(this.calendar.getEventsData(), 'start');

    if (slots?.length > 0) this.calendar.setDate(slots[0]?.start);
  }
  /**
   * Load more dates
   */


  onMonthChange = async currentDate => {
    const firstDay = (0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])(currentDate);
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
    await Promise.all((0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.getMondays)(startDate).map(monday => this.getAvailability(monday)));
    this.toggleLoading();
  }
  /**
   * Get Availability
   */


  async getAvailability(weekStartDate) {
    const weekKey = (0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(weekStartDate);
    if (weekStartDate < new Date() || this.#cached[weekKey]) return;
    this.#cached[weekKey] = true;
    const url = new URL('https://inplace-booking.azurewebsites.net/api/availability');
    const params = new URLSearchParams({
      code: 'jDlOk9eyca7HVUuVn2fRaIDQmv57z9l8bCHssUSMzpDugndIrzi5Tw==',
      postalCode: this.#request.postalCode,
      duration: this.#request.duration,
      recurrence: this.#request.recurrence,
      weekSearchDate: (0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(weekStartDate)
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

    const newEvents = lodash_compact__WEBPACK_IMPORTED_MODULE_0___default()(avail?.data?.map(dateAvail => dateAvail.time_slots.map(slot => slotToEvent(slot))).flat());

    newEvents.length > 0 && this.calendar.addEventsData(newEvents);
  }

}
}();
Calendar = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=Calendar.bundle.js.map