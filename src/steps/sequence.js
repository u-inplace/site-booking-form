import { SERVICE, STEP } from './constants'
import DOM from './dom'

/**
 * Sequence Controller
 */
export default class Sequence {
    #current

    constructor() {
        this.reset()
    }

    reset() {
        this.#current = 0

        let seq = [STEP.Services]
        if (DOM.isServiceSelected(SERVICE.Ironing)) seq.push(STEP.Ironing)
        if (DOM.isServiceSelected(SERVICE.Cleaning)) seq.push(STEP.Cleaning)
        seq = seq.concat([STEP.Duration, STEP.Availability, STEP.Contact])
        this.list = seq
    }

    get next() {
        this.#current++
        console.log(`Seq : ${this.list} ; curr : ${this.#current}`)
        return this.list[this.#current]
    }

    get prev() {
        this.#current--
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
