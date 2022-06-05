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
        console.log(JSON.stringify(bookings))
    }

    /**
     * Fetch bookings for user within date range
     * @param {Date} dateFrom
     * @param {Date} dateTo
     * @returns {import('../types/bookings').BookingsReadResponse}
     */
    async fetch(dateFrom, dateTo) {
        const fromStr = toISOStringShort(dateFrom)
        const toStr = toISOStringShort(dateTo)
        const customer = Number(this.member['pootsy-id'])
        let bookings = {}

        try {
            const url = new URL('https://blue.inplace.be/api/bookings')
            const params = new URLSearchParams({
                code: 'X0XQCODICDXlLbCRdgVHLlN7C-lNWRZ_DOZmJJkxyAj5AzFu3r05kw==',
                customer,
                fromDate: fromStr,
                toDate: toStr
            })

            url.search = params
            bookings = await fetch(url)
            return bookings
        } catch (err) {
            console.error(err)
            return bookings
        }
    }
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const controller = new BookingsController()
    controller.init()
})
