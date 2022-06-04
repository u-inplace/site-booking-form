/* eslint-disable vars-on-top */
import { toISOStringShort } from '../../helpers/dates'
/* eslint-disable no-var */

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
        const dateTo = new Date(dateFrom.setMonth(dateFrom.getMonth() + 3))
        const bookings = this.fetch(dateFrom, dateTo)
        console.log(JSON.stringify(bookings))
    }

    /**
     * Fetch bookings for user within date range
     * @param {Date} dateFrom
     * @param {Date} dateTo
     */
    async fetch(dateFrom, dateTo) {
        const fromStr = toISOStringShort(dateFrom)
        const toStr = toISOStringShort(dateTo)
        const customer = this.member['pootsy-id']

        const url = new URL('https://blue.inplace.be/api/bookings')
        const params = new URLSearchParams({
            code: 'X0XQCODICDXlLbCRdgVHLlN7C-lNWRZ_DOZmJJkxyAj5AzFu3r05kw==',
            customer: Number(customer),
            fromDate: fromStr,
            toDate: toStr
        })

        url.search = params
        const res = await fetch(url)
        return res
    }
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const controller = new BookingsController()
    controller.init()
})
