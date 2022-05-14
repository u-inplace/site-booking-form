import Cookies from 'js-cookie'

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
}

const COOKIE_BOOKING = '__booking'

/**
 * Sequence Controller
 */
export default class Sequence {
    #current
    list

    /**
     * @param {StepCode} curr
     */
    constructor(curr) {
        const cookieStr = Cookies.get(COOKIE_BOOKING)

        if (cookieStr) {
            const cookie = JSON.parse(cookieStr)
            this.list = cookie.seq
        } else this.init({})

        this.current = curr
    }

    init({ ironing = false, cleaning = false } = {}) {
        let seq = [STEP.PostalCode, STEP.Services]
        if (ironing) seq.push(STEP.Ironing)
        if (cleaning) seq.push(STEP.Cleaning)
        seq = seq.concat([STEP.Duration, STEP.Availability, STEP.Confirmation])
        this.list = seq
        this.setCookies()
    }

    setCookies() {
        Cookies.set(
            COOKIE_BOOKING,
            JSON.stringify({
                seq: this.list
            }),
            { secure: true, sameSite: 'strict' }
        )
    }

    next() {
        return this.list[this.#current + 1]
    }

    prev() {
        return this.list[this.#current - 1]
    }

    get total() {
        return this.list.length
    }

    get current() {
        return this.list[this.#current]
    }

    /**
     * @param {string} current
     */
    set current(curr) {
        const currIndex = Object.values(this.list).findIndex(e => e === curr)
        if (currIndex >= 0) this.#current = currIndex
    }

    get currentIndex() {
        return this.#current
    }
}

export { STEP }
