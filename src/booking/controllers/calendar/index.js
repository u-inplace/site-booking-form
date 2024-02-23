import Calendar from 'color-calendar'
import 'color-calendar/dist/css/theme-glass.css'
import { addMonths, startOfMonth } from 'date-fns'
import getWeek from 'date-fns/getWeek'
import _ from 'lodash'
import { getMondays, toISOStringShort } from '../../helpers/dates'
import './styles.css'

/**
 * Constants
 */
const LoaderId = 'loaderBalls'

/**
 * @typedef {Object} AvailabilityResponse
 * @property {AvailData[]} data
 */
/**
 * @typedef {Object} AvailData
 * @property {string} delivery_date
 * @property {TimeSlots[]} time_slots
 */
/**
 * @typedef {Object} TimeSlots
 * @property {string} start_time
 * @property {string} end_time
 * @property {number} priority
 * @property {object} distance_from_last_location
 * @property {boolean} last_location_is_home
 * @property {number} event_id
 * @property {boolean} fills_th_entirely
 * @property {boolean} contained_by_th
 * @property {boolean} is_extra_hour
 * @property {string} label
 * @property {string} key
 * @property {AffiliateWorker} affiliate_worker
 * @property {number} global_priority
 * @property {WorkerDetails} worker_details
 * @property {Affiliate} affiliate
 */
/**
 * @typedef {Object} AffiliateWorker
 * @property {string} first_name
 * @property {string} last_name
 * @property {object} allergies
 * @property {number} worker_contract_id
 * @property {number} affiliate_id
 * @property {string} affiliate_name
 * @property {number} priority
 * @property {string} title
 * @property {object} comment
 */
/**
 * @typedef {Object} WorkerDetails
 * @property {string} first_name
 * @property {string} last_name
 * @property {object} allergies
 * @property {number} worker_contract_id
 * @property {number} affiliate_id
 * @property {string} affiliate_name
 * @property {number} priority
 * @property {string} title
 * @property {object} comment
 */
/**
 * @typedef {Object} Affiliate
 * @property {string} name
 * @property {number} id
 * @property {number} days_before_new_booking
 * @property {string} telephone
 * @property {string} customer_support_email
 */

/**
 * Calendar Controller
 */
export default class CalendarController {
    #placeHolderID
    #initialised
    #request

    /** @type {Function} */
    #onDayChangeCb

    /** @type {number[]} */
    #cached

    /** @type {Date} */
    #curr

    constructor(placeHolderID, request, onDayChangeCb) {
        // Store requested weeks
        this.#cached = {}

        this.#request = request
        this.#onDayChangeCb = onDayChangeCb

        this.#initialised = false
        this.#placeHolderID = placeHolderID

        const newLocal = this
        newLocal.calendar = new Calendar({
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
        })
        // Add loading animation
        this.addLoadingAnimation()
    }

    async init() {
        this.#initialised = true

        // In case of no dates available in the current month, skip to the next one
        if (this.calendar.getEventsData().length === 0) {
            const curr = new Date()
            const next = addMonths(curr, 1)
            // console.log(`init | curr: ${toISOStringShort(curr)}, next: ${toISOStringShort(next)}`)
            await this.getMonthAvailability(next)
        }

        // Shorthands like 'start' below are heavy futures, removed by default
        // when using lodash-webpack-plugin
        const slots = _.sortBy(this.calendar.getEventsData(), [e => e.start])

        if (slots?.length > 0) this.calendar.setDate(slots[0]?.start)
    }

    /**
     * Load more dates
     * @param {Date} currentDate
     */
    onMonthChange = async currentDate => {
        // Only trigger change if month really changed
        console.log(
            `onMonthChange | currDate: ${toISOStringShort(currentDate)} this.curr: ${
                this.#curr ? toISOStringShort(this.#curr) : ''
            }`
        )
        if (this.#curr?.getMonth() !== currentDate.getMonth()) {
            // Define only if not initialised yet
            this.#curr ??= currentDate

            // Trigger a clean up of the calendar
            this.#onDayChangeCb(currentDate, [])

            const firstDay = startOfMonth(currentDate)
            // console.log(`onMonthChange | firstDay: ${toISOStringShort(firstDay)}`)
            await this.getMonthAvailability(firstDay)
            if (!this.#initialised) this.init()
        }
    }

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
            this.#curr = currentDate
            this.#onDayChangeCb(currentDate, events)
        }
    }

    /**
     * Start or stop loading animation
     */
    // eslint-disable-next-line class-methods-use-this
    toggleLoading(isVisible) {
        const loader = document.getElementById(LoaderId)
        loader && (loader.style.visibility = isVisible ? 'visible' : 'hidden')
    }

    /**
     * Create a hidden loading animation to be called in monthChange
     */
    // eslint-disable-next-line class-methods-use-this
    addLoadingAnimation() {
        // Add loading animation
        const loader = document.createElement('div')
        loader.classList.add('loader')
        loader.id = LoaderId
        loader.style.visibility = 'visible'
        loader.innerHTML = `
            <span class="loader__element"></span>
        `
        document.getElementsByClassName('calendar__monthyear')[0].appendChild(loader)
    }

    /**
     * @param {Date} startDate
     */
    async getMonthAvailability(startDate) {
        this.toggleLoading(true)
        console.log(`getMonthAvailability | startDate: ${toISOStringShort(startDate)}`)
        console.log(
            `getMonthAvailability | mondays: ${JSON.stringify(
                getMondays(startDate).map(m => toISOStringShort(m))
            )}`
        )
        await Promise.all(getMondays(startDate).map(monday => this.getAvailability(monday)))
        this.toggleLoading()
    }

    /**
     * Generates a unique key for a week based on its start date.
     * The key is a combination of the year and the week number.
     * @param {Date} date - The start date of the week.
     * @returns {string} A unique key for the week.
     */
    getWeekKey(date) {
        const year = date.getFullYear()
        const weekNumber = getWeek(date)
        return `${year}${weekNumber}`
    }

    /**
     * Get Availability
     */
    async getAvailability(weekStartDate) {
        const weekKey = this.getWeekKey(weekStartDate)
        const currentWeekKey = this.getWeekKey(new Date())

        // Debugging only
        console.log(`getAvailability | weekKey: ${weekKey}`)
        console.log(`getAvailability | currentWeekKey: ${currentWeekKey}`)
        console.log(`getAvailability | this.#cached: ${JSON.stringify(this.#cached)}`)
        console.log(`getAvailability | this.#cached[weekKey]: ${this.#cached[weekKey]}`)
        console.log(`getAvailability | run: ${weekKey < currentWeekKey || this.#cached[weekKey]}`)

        // Compare week number instead of date to avoid not requesting availability
        // for the current week if the weekStartDate is in the past
        if (weekKey < currentWeekKey || this.#cached[weekKey]) return
        this.#cached[weekKey] = true

        console.log(
            `getAvailability | weekStartDate: ${toISOStringShort(
                weekStartDate
            )} weekKey: ${weekKey}`
        )

        const url = new URL('https://blue.inplace.be/api/availability')
        const params = new URLSearchParams({
            code: 'jDlOk9eyca7HVUuVn2fRaIDQmv57z9l8bCHssUSMzpDugndIrzi5Tw==',
            postalCode: this.#request.postalCode,
            duration: this.#request.duration,
            recurrence: this.#request.recurrence,
            weekSearchDate: toISOStringShort(weekStartDate)
        })

        url.search = params
        const res = await fetch(url)

        /** @type {AvailabilityResponse} */
        const avail = await res.json()

        console.log(JSON.stringify(avail, null, 2))

        /**
         * @param {TimeSlots} slot
         */
        const slotToEvent = slot =>
            // Only add if it's still the same month as start of the week
            // to avoid infinity loop with monthChanged event, which is triggered
            // when a new event is added
            // Removing this check will cause the calendar to skip days on the next month
            // if the week starts in the previous month
            // if (new Date(slot.start_time).getMonth() !== weekStartDate.getMonth()) return

            // eslint-disable-next-line consistent-return
            ({
                start: new Date(slot.start_time),
                end: new Date(slot.end_time),
                start_time: slot.label,
                employee: {
                    id: slot.affiliate_worker.worker_contract_id,
                    first_name: slot.affiliate_worker.first_name,
                    last_name: slot.affiliate_worker.last_name,
                    allergies: slot.affiliate_worker.allergies
                }
            })

        const newEvents = _.compact(
            avail?.data
                ?.map(dateAvail => dateAvail.time_slots.map(slot => slotToEvent(slot)))
                .flat()
        )

        newEvents.length > 0 && this.calendar.addEventsData(newEvents)
    }
}
