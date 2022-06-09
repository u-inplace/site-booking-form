/* eslint-disable vars-on-top */
/* eslint-disable no-var */

import { addMonths } from 'date-fns'
import { toISOStringShort } from '../../helpers/dates'

class BookingsController {
    /** @type {import('../types/memberstack').Member} */
    member

    /**
     * Initialize controller
     */
    async init() {
        // Wait for MemberStack
        // eslint-disable-next-line no-undef
        const member = await MemberStack.onReady
        this.member = member

        this.load()
    }

    /**
     * Fetch and load bookings
     */
    async load() {
        // Fetch bookings for the upcoming 3 months
        const dateFrom = new Date()
        const dateTo = addMonths(dateFrom, 3)
        const bookings = await this.fetch(dateFrom, dateTo)

        console.log(JSON.stringify(bookings, null, 2))
    }

    /**
     * Fetch bookings for user within date range
     * @param {Date} dateFrom
     * @param {Date} dateTo
     * @returns {BookingType}
     */
    async fetch(dateFrom, dateTo) {
        const fromStr = toISOStringShort(dateFrom)
        const toStr = toISOStringShort(dateTo)
        const customer = Number(this.member['pootsy-id'])

        /** @type {BookingType[]} */
        let bookings = {}

        try {
            const url = new URL('https://blue.inplace.be/api/bookings')
            const params = new URLSearchParams({
                code: 'X0XQCODICDXlLbCRdgVHLlN7C-lNWRZ_DOZmJJkxyAj5AzFu3r05kw==',
                customer,
                from_date: fromStr,
                to_date: toStr
            })

            url.search = params
            const res = await fetch(url)
            const resJson = await res.json()
            bookings = this.remodel(resJson)
        } catch (err) {
            console.error(err)
        }

        return bookings
    }

    /**
     * @typedef {Object} BookingType
     * @property {string} id
     * @property {number} teamMemberId
     * @property {number} customerId
     * @property {string} teamMember
     * @property {string} serviceDate
     * @property {string} startTime
     * @property {string} endTime
     * @property {string} startEndTime
     * @property {string} day
     * @property {string} month
     * @property {boolean} recurrence
     * @property {string} status
     * @property {number} duration
     */
    /**
     * Remodel booking data to fit interface needs
     * @param {import('../types/bookings').BookingsReadResponse} incoming
     * @returns {BookingType[]}
     */
    remodel(incoming) {
        const { lang } = this

        return incoming?.data?.map(orig => {
            const dateStrToTime = dateStr =>
                new Date(dateStr).toLocaleTimeString('fr', { timeStyle: 'short' })
            const startEndTime = attrs =>
                `${dateStrToTime(attrs.start_time)} - ${dateStrToTime(attrs.end_time)}`

            const attrs = orig.attributes
            const date = new Date(attrs.start_time)

            /** @type {BookingType} */
            const booking = {
                id: orig.id,
                teamMemberId: attrs.worker_contract_id,
                customerId: attrs.customer_contract_id,
                teamMember: attrs.worker_display_name,
                serviceDate: attrs.delivery_date,
                startTime: dateStrToTime(attrs.start_time),
                endTime: dateStrToTime(attrs.end_time),
                startEndTime: startEndTime(attrs),
                day: date.getDate(),
                month: date.toLocaleDateString(lang, { month: 'short' }),
                recurrence: attrs.recurrence,
                status: attrs.service_delivery_status,
                duration: `${attrs.billable_hours}h`
            }

            return booking
        })
    }

    /**
     * Get the user language from Weglot
     */
    get lang() {
        // eslint-disable-next-line no-undef
        return Weglot?.getCurrentLang() || 'FR'
    }
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const controller = new BookingsController()
    controller.init()
})
