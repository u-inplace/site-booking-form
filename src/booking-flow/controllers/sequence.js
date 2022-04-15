import Cookies from 'js-cookie'

const STEP = {
    PostalCode: '/booking',
    Services: '/booking/services',
    Ironing: '/booking/ironing',
    Cleaning: '/booking/cleaning',
    Duration: '/booking/duration',
    Availability: '/booking/availability',
    Confirmation: '/booking/confirmation'
}

/**
 * Sequence Controller
 */
export default class Sequence {
    #current
    list

    constructor() {
        const cookieStr = Cookies.get('ip-booking-flow')

        if (cookieStr) {
            const cookie = JSON.parse(cookieStr)
            this.#current = cookie.current
            this.list = cookie.list
        } else this.init({})
    }

    init({ ironing = false, cleaning = false, keepCurrent = false } = {}) {
        !keepCurrent && (this.#current = 0)

        let seq = [STEP.PostalCode, STEP.Services]
        ironing && seq.push(STEP.Ironing)
        cleaning && seq.push(STEP.Cleaning)
        seq = seq.concat([STEP.Duration, STEP.Availability, STEP.Confirmation])
        this.list = seq

        this.setCookies()
    }

    setCookies() {
        Cookies.set(
            'ip-booking-flow',
            JSON.stringify({
                seq: this.list,
                current: this.#current
            }),
            { secure: true, sameSite: 'strict' }
        )
    }

    get next() {
        this.#current++
        this.setCookies()
        console.log(`Seq : ${this.list} ; curr : ${this.#current}`)
        return this.list[this.#current]
    }

    get prev() {
        this.#current--
        this.setCookies()
        console.log(`Seq : ${this.list} ; curr : ${this.#current}`)
        return this.list[this.#current]
    }

    get total() {
        return this.list.length
    }

    get current() {
        return this.list[this.#current]
    }

    get currentIndex() {
        return this.#current
    }
}
