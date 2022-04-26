import Calendar from 'color-calendar'
import 'color-calendar/dist/css/theme-glass.css'
import { addMonths, startOfMonth } from 'date-fns'
import _ from 'lodash'
import { getMondays, toISOStringShort } from '../../helpers/dates'
import './styles.css'

/**
 * Constants
 */
const LoaderId = 'loaderBalls'

/**
 * Calendar Controller
 */
export default class CalendarController {
    #placeHolderID
    #initialised
    #request
    #cached
    #onDayChangeCb

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
            await this.getMonthAvailability(next)
        }

        const slots = _.sortBy(this.calendar.getEventsData(), ['start'])

        if (slots?.length > 0) this.calendar.setDate(slots[0]?.start)
    }

    /**
     * Load more dates
     */
    onMonthChange = async currentDate => {
        const firstDay = startOfMonth(currentDate)
        await this.getMonthAvailability(firstDay)
        if (!this.#initialised) this.init()
    }

    /**
     * Load slots into view
     * @param {*} currentDate
     * @param {*} events
     */
    // eslint-disable-next-line class-methods-use-this
    onDateChange = (currentDate, events) => {
        this.#onDayChangeCb(currentDate, events)
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

    async getMonthAvailability(startDate) {
        this.toggleLoading(true)
        await Promise.all(getMondays(startDate).map(monday => this.getAvailability(monday)))
        this.toggleLoading()
    }

    /**
     * Get Availability
     */
    async getAvailability(weekStartDate) {
        const weekKey = toISOStringShort(weekStartDate)

        if (weekStartDate < new Date() || this.#cached[weekKey]) return
        this.#cached[weekKey] = true

        const url = new URL('https://inplace-booking.azurewebsites.net/api/availability')
        const params = new URLSearchParams({
            code: 'jDlOk9eyca7HVUuVn2fRaIDQmv57z9l8bCHssUSMzpDugndIrzi5Tw==',
            postalCode: this.#request.postalCode,
            duration: this.#request.duration,
            recurrence: this.#request.recurrence,
            weekSearchDate: toISOStringShort(weekStartDate)
        })

        url.search = params
        const res = await fetch(url)
        const avail = await res.json()

        // console.log(JSON.stringify(avail, null, 2))

        const slotToEvent = slot => {
            // Only add if it's still the same month as start of the week
            // to avoid infinity loop with monthChanged event, which is triggered
            // when a new event is added
            if (new Date(slot.start_time).getMonth() !== weekStartDate.getMonth()) return

            // eslint-disable-next-line consistent-return
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
            }
        }

        const newEvents = _.compact(
            avail?.data
                ?.map(dateAvail => dateAvail.time_slots.map(slot => slotToEvent(slot)))
                .flat()
        )

        newEvents.length > 0 && this.calendar.addEventsData(newEvents)
    }
}
