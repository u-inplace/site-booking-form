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

/***/ "./node_modules/date-fns/esm/getWeek/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/getWeek/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWeek; }
/* harmony export */ });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _startOfWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfWeekYear/index.js */ "./node_modules/date-fns/esm/startOfWeekYear/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




var MILLISECONDS_IN_WEEK = 604800000;
/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Number} the week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */

function getWeek(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var diff = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date, options).getTime() - (0,_startOfWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date, options).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/getWeekYear/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/getWeekYear/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWeekYear; }
/* harmony export */ });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Number} the local week-numbering year
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */

function getWeekYear(dirtyDate, options) {
  var _options$locale, _options$locale$optio;

  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var year = date.getFullYear();
  var localeFirstWeekContainsDate = options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(localeFirstWeekContainsDate);
  var firstWeekContainsDate = (options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) == null ? defaultFirstWeekContainsDate : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(firstWeekOfThisYear, options);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
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

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ startOfWeek; }
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfWeek(dirtyDate, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeekYear/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeekYear/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ startOfWeekYear; }
/* harmony export */ });
/* harmony import */ var _getWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getWeekYear/index.js */ "./node_modules/date-fns/esm/getWeekYear/index.js");
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Date} the start of a week-numbering year
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */

function startOfWeekYear(dirtyDate, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options.firstWeekContainsDate);
  var year = (0,_getWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate, dirtyOptions);
  var firstWeek = new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(firstWeek, dirtyOptions);
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

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");
/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */


function castArray() {
  if (!arguments.length) {
    return [];
  }

  var value = arguments[0];
  return isArray(value) ? value : [value];
}

module.exports = castArray;

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

/***/ "./node_modules/lodash/_arrayIncludes.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayIncludes.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js");
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */


function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_arrayIncludesWith.js ***!
  \***************************************************/
/***/ (function(module) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }

  return false;
}

module.exports = arrayIncludesWith;

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

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIndexOf.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}

module.exports = strictIndexOf;

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

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeKeys = overArg(Object.keys, Object);
module.exports = nativeKeys;

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

/***/ "./node_modules/lodash/_baseUniq.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseUniq.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "./node_modules/lodash/_arrayIncludesWith.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js"),
    createSet = __webpack_require__(/*! ./_createSet */ "./node_modules/lodash/_createSet.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js");
/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */

function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);

    if (set) {
      return setToArray(set);
    }

    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }

  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      var seenIndex = seen.length;

      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }

      if (iteratee) {
        seen.push(computed);
      }

      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }

      result.push(value);
    }
  }

  return result;
}

module.exports = baseUniq;

/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/lodash/_baseIndexOf.js");
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */


function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

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

/***/ "./node_modules/lodash/_createSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_createSet.js ***!
  \*******************************************/
/***/ (function(module) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {// No operation performed.
}

module.exports = noop;

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

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

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
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

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

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

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/***/ (function(module) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

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

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
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

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
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

/***/ "./node_modules/lodash/isEmpty.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEmpty.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");
/** `Object#toString` result references. */


var mapTag = '[object Map]',
    setTag = '[object Set]';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }

  var tag = getTag(value);

  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }

  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

module.exports = isEmpty;

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

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

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
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

/***/ "./node_modules/lodash/uniqBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/uniqBy.js ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    baseUniq = __webpack_require__(/*! ./_baseUniq */ "./node_modules/lodash/_baseUniq.js");
/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */


function uniqBy(array, iteratee) {
  return array && array.length ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}

module.exports = uniqBy;

/***/ }),

/***/ "./src/booking-flow/controllers/calendar/index.js":
/*!********************************************************!*\
  !*** ./src/booking-flow/controllers/calendar/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony import */ var date_fns_getWeek__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns/getWeek */ "./node_modules/date-fns/esm/getWeek/index.js");
/* harmony import */ var _helpers_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/dates */ "./src/booking-flow/helpers/dates.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles.css */ "./src/booking-flow/controllers/calendar/styles.css");








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
  /** @type {Function} */

  #onDayChangeCb;
  /** @type {number[]} */

  #cached;
  /** @type {Date} */

  #curr;

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
      console.log(`init | curr: ${(0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(curr)}, next: ${(0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(next)}`);
      await this.getMonthAvailability(next);
    } // Shorthands like 'start' below are heavy futures, removed by default
    // when using lodash-webpack-plugin


    const slots = lodash_sortBy__WEBPACK_IMPORTED_MODULE_1___default()(this.calendar.getEventsData(), [e => e.start]);

    if (slots?.length > 0) this.calendar.setDate(slots[0]?.start);
  }
  /**
   * Load more dates
   * @param {Date} currentDate
   */


  onMonthChange = async currentDate => {
    // Only trigger change if month really changed
    console.log(`onMonthChange | currDate: ${(0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(currentDate)} this.curr: ${this.#curr}`);

    if (this.#curr?.getMonth() !== currentDate.getMonth()) {
      this.#curr = currentDate;
      const firstDay = (0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])(currentDate);
      console.log(`onMonthChange | firstDay: ${(0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(firstDay)}`);
      await this.getMonthAvailability(firstDay);
      if (!this.#initialised) this.init();
    }
  };
  /**
   * Load slots into view
   * @param {*} currentDate
   * @param {*} events
   */
  // eslint-disable-next-line class-methods-use-this

  onDateChange = (currentDate, events) => {
    // Only trigger change if date really changed,
    // but only if #curr has been initialised
    if (this.#curr && this.#curr !== currentDate) {
      this.#curr = currentDate;
      this.#onDayChangeCb(currentDate, events);
    }
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
  /**
   * @param {Date} startDate
   */


  async getMonthAvailability(startDate) {
    this.toggleLoading(true);
    console.log(`getMonthAvailability | startDate: ${(0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(startDate)}`);
    console.log(`getMonthAvailability | mondays: ${JSON.stringify((0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.getMondays)(startDate).map(m => (0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(m)))}`);
    await Promise.all((0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.getMondays)(startDate).map(monday => this.getAvailability(monday)));
    this.toggleLoading();
  }
  /**
   * Get Availability
   */


  async getAvailability(weekStartDate) {
    const weekKey = (0,date_fns_getWeek__WEBPACK_IMPORTED_MODULE_8__["default"])(weekStartDate);
    if (weekStartDate < new Date() || this.#cached[weekKey]) return;
    this.#cached[weekKey] = true;
    console.log(`getAvailability | weekStartDate: ${(0,_helpers_dates__WEBPACK_IMPORTED_MODULE_4__.toISOStringShort)(weekStartDate)} weekKey: ${weekKey}`);
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

/***/ }),

/***/ "./src/booking-flow/controllers/navigation.js":
/*!****************************************************!*\
  !*** ./src/booking-flow/controllers/navigation.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NavigationController; }
/* harmony export */ });
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking-flow/helpers/dom.js");
/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sequence */ "./src/booking-flow/controllers/sequence.js");


class NavigationController {
  sequence;

  constructor({
    formId = 'wf-form-step',
    sequence = new _sequence__WEBPACK_IMPORTED_MODULE_1__["default"]()
  }) {
    this.sequence = sequence; // Submit = nextButton

    _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id(formId).onsubmit = this.onNext.bind(this);
    _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id('back-button')?.addEventListener('click', this.onBack.bind(this)); // Browser history

    window.onpopstate = this.onBack.bind(this);
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
    this.sequence.prev(); // eslint-disable-next-line no-restricted-globals

    history.back();
  }

}

/***/ }),

/***/ "./src/booking-flow/controllers/options.js":
/*!*************************************************!*\
  !*** ./src/booking-flow/controllers/options.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
   * @typedef {Object} CookieOptions
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
   */

  /**
   * @type {CookieOptions}
   */

  ops;

  constructor() {
    this.cookie = window.FpCookie;
    this.ops = this.cookie.store;
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

}

/***/ }),

/***/ "./src/booking-flow/controllers/sequence.js":
/*!**************************************************!*\
  !*** ./src/booking-flow/controllers/sequence.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/booking-flow/controllers/step.js":
/*!**********************************************!*\
  !*** ./src/booking-flow/controllers/step.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ StepController; }
/* harmony export */ });
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking-flow/helpers/dom.js");
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation */ "./src/booking-flow/controllers/navigation.js");
/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sequence */ "./src/booking-flow/controllers/sequence.js");



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
   * Create new StepController
   * @param {import('./sequence').StepCode} curr Current step
   * @param {string} formId Step form Id
   */

  constructor(curr, formId = 'wf-form-step') {
    this.form = _helpers_dom__WEBPACK_IMPORTED_MODULE_0__["default"].id(formId);
    this.nav = new _navigation__WEBPACK_IMPORTED_MODULE_1__["default"]({
      formId,
      sequence: new _sequence__WEBPACK_IMPORTED_MODULE_2__["default"](curr)
    });
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

/***/ "./src/booking-flow/helpers/dates.js":
/*!*******************************************!*\
  !*** ./src/booking-flow/helpers/dates.js ***!
  \*******************************************/
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

/***/ "./src/booking-flow/helpers/dom.js":
/*!*****************************************!*\
  !*** ./src/booking-flow/helpers/dom.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
  /**
   * STEPS
   */


  static steps = class {
    /**
     * Services
     */
    static services = class {
      static query(checked = false) {
        return Dom.queryOptions('service-', checked);
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
        return this.selected.includes(service);
      }

    };
    /**
     * Ironing
     */

    static ironing = class {
      static get selected() {
        return Dom.getRadio('ironing-size', true)?.value?.replace(/^ironing-size-/, '');
      }

    };
    /**
     * Availability
     */

    static avail = class {
      static openings = class {
        static cleanUp() {
          Dom.id('start-time-block')?.querySelectorAll('.start-time')?.forEach(e => e.parentNode.removeChild(e));
        }

        static showWarning() {
          Dom.id('aval-warning').classList.add('msg-active');
        }

        static hideWarning() {
          Dom.id('aval-warning').classList.remove('msg-active');
        }

      };
      static team = class {
        static showBlock() {
          Dom.id('team-members-block').classList.add('visible');
        }

        static hideBlock() {
          Dom.id('team-members-block').classList.remove('visible');
        }

        static cleanUp() {
          Dom.id('team-members-block')?.querySelectorAll('.team-member')?.forEach(e => e.parentNode.removeChild(e));
        }

        static get memberTemplate() {
          return Dom.id('team-member-template');
        }

      };
      static teamMember = class {
        static get name() {
          return Dom.id('team-member-name').value;
        }

        static set name(name) {
          Dom.id('team-member-name').value = name;
        }

        static get firstName() {
          return Dom.id('team-member-first-name').value;
        }

        static set firstName(first) {
          Dom.id('team-member-first-name').value = first;
        }

        static get avatar() {
          return Dom.id('team-members-block').querySelector('img').src;
        }

      };
    };
  };
  /** *
   * Summary
   */

  static summary = class {
    /**
     * @typedef {import('../controllers/options').Service} ServiceOptions
     * @param {ServiceOptions} service
     */
    static set service(service) {
      Object.entries(service).forEach(([s, isActive]) => this.displayService(s, isActive));
    }
    /**
     * Show or hide service
     * @param {import('../controllers/options').Services} s
     * @param {boolean} display
     */


    static displayService(s, display = true) {
      const {
        classList
      } = Dom.id(`summary-${s}`);
      if (display) classList.add('service-active');else classList.remove('service-active');
    }
    /**
     * Display recurrence
     * @param {('weekly'|'biweekly'|'once')} r
     */


    static set recurrence(r) {
      Dom.id(`summary-${r}`).classList.remove('hidden');
    }

  };
}

const dom = Dom;
/* harmony default export */ __webpack_exports__["default"] = (dom);

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

/***/ "./src/booking-flow/controllers/calendar/styles.css":
/*!**********************************************************!*\
  !*** ./src/booking-flow/controllers/calendar/styles.css ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/booking-flow/packages/availability.css":
/*!****************************************************!*\
  !*** ./src/booking-flow/packages/availability.css ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
/*!***************************************************!*\
  !*** ./src/booking-flow/packages/availability.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_uniqBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/uniqBy */ "./node_modules/lodash/uniqBy.js");
/* harmony import */ var lodash_uniqBy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqBy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controllers_calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/calendar */ "./src/booking-flow/controllers/calendar/index.js");
/* harmony import */ var _controllers_options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/options */ "./src/booking-flow/controllers/options.js");
/* harmony import */ var _controllers_sequence__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/sequence */ "./src/booking-flow/controllers/sequence.js");
/* harmony import */ var _controllers_step__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/step */ "./src/booking-flow/controllers/step.js");
/* harmony import */ var _helpers_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/dom */ "./src/booking-flow/helpers/dom.js");
/* harmony import */ var _availability_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./availability.css */ "./src/booking-flow/packages/availability.css");








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

class Step extends _controllers_step__WEBPACK_IMPORTED_MODULE_5__["default"] {
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
  /**
   * @type {BookingOptions}
   */

  ops;
  /**
   * Dom calendar helpers
   */

  cal;

  constructor() {
    super(_controllers_sequence__WEBPACK_IMPORTED_MODULE_4__.STEP.Availability);
    this.ops = new _controllers_options__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.cal = _helpers_dom__WEBPACK_IMPORTED_MODULE_6__["default"].steps.avail;
  }
  /**
   * @returns {boolean}
   */


  get isNextDisabled() {
    return !_helpers_dom__WEBPACK_IMPORTED_MODULE_6__["default"].getRadio('team-member', true);
  }

  init() {
    super.init(); // Get all team members from Webflow CMS

    this.#fetchTeam(); // Clean up existing entries

    this.cal.team.cleanUp();
    this.toggleNext(); // Update duration when loading Duration step

    this.#calendar = new _controllers_calendar__WEBPACK_IMPORTED_MODULE_2__["default"]('availability-cal', {
      postalCode: this.ops.postalCode,
      duration: this.ops.duration,
      recurrence: this.ops.recurrence
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
    const {
      service,
      recurrence
    } = this.ops;
    _helpers_dom__WEBPACK_IMPORTED_MODULE_6__["default"].summary.service = service;
    _helpers_dom__WEBPACK_IMPORTED_MODULE_6__["default"].summary.recurrence = recurrence;
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

    this.cal.openings.cleanUp(); // Hide Team block

    this.cal.team.hideBlock();
    if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(openings)) this.cal.openings.showWarning();else this.cal.openings.hideWarning();

    lodash_uniqBy__WEBPACK_IMPORTED_MODULE_0___default()(openings, o => o.start_time).forEach(open => {
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
    const createTeamMember = open => {
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

      const avatar = this.team.find(m => m.name === `${open.employee.first_name} ${open.employee.last_name}`)?.['profile-picture'];
      if (avatar?.url) node.querySelector('.team-avatar').src = avatar.url; // Save team member name in attribute

      node.querySelector('input').setAttribute('member-name', `${open.employee.first_name} ${open.employee.last_name}`);
      node.querySelector('input').setAttribute('member-first-name', `${open.employee.first_name}`);
    }; // Clean up existing entries


    this.cal.team.cleanUp();
    this.cal.team.showBlock();
    const start_time = event.target.value;
    const template = this.cal.team.memberTemplate; // Set start and end time on hidden inputs

    _helpers_dom__WEBPACK_IMPORTED_MODULE_6__["default"].id('start-timestamp').value = this.openings[0].start.toISOString();
    _helpers_dom__WEBPACK_IMPORTED_MODULE_6__["default"].id('end-timestamp').value = this.openings[0].end.toISOString();

    const startTimeFilter = o => o.start_time === start_time;

    this.openings.filter(startTimeFilter).forEach(createTeamMember); // Wire events for newly created elements for next button

    _helpers_dom__WEBPACK_IMPORTED_MODULE_6__["default"].queryRadio('team-member').forEach(r => r.addEventListener('click', this.toggleNext.bind(this)));
    this.toggleNext();
  }
  /**
   * Read attrs and store team member name into input fields
   * @param {MouseEvent} event
   */


  onTeamMemberSelect(event) {
    const member = event.target;
    this.cal.teamMember.name = member.getAttribute('member-name');
    this.cal.teamMember.firstName = member.getAttribute('member-first-name');
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

var Webflow = Webflow || window.Webflow || [];
Webflow.push(() => {
  const step = new Step();
  step.init();
});
}();
/******/ })()
;
//# sourceMappingURL=StepAvailability.js.map