import { STEP } from './constants'
import DOM from './dom'
import BookingModel from './model'
import Sequence from './sequence'
import Slider from './slider'
import Steps from './steps'

export default class Navigation {
    #slider
    #sequence
    #model

    constructor() {
        this.#sequence = new Sequence()
        this.#slider = new Slider(this.#sequence)
        this.#model = new BookingModel(Steps)

        // Handle step validations
        DOM.setNextButtonDisabled(true)

        // Setup event handlers
        Object.values(Steps).forEach(s => {
            s.observed.forEach(o => {
                // eslint-disable-next-line no-param-reassign
                o.elem.checked = false
                o.elem.addEventListener(o.event, this.#toggleNext.bind(this))
            })
        })
    }

    #updateNav() {
        document.getElementsByClassName('step-number')[this.#slider.current].innerHTML = `Step ${
            this.#sequence.current
        }/${this.#sequence.current === STEP.Services ? '-' : this.#sequence.total}`
    }

    #toggleNext() {
        const isDisabled = Steps[this.#slider.current]?.isNextDisabled
        DOM.setNextButtonDisabled(isDisabled)
    }

    onNext() {
        // Recalculate the sequence when leaving the first step
        if (this.#slider.current === STEP.Services) this.#sequence.reset()

        this.#slider.next()
        this.#updateNav()

        switch (this.#slider.current) {
            case STEP.Duration:
                this.#model.updateEstimation()
                break
            default:
                this.#toggleNext()
                break
        }
    }

    onBack = () => {
        this.#slider.prev()
        this.#updateNav()
        this.#toggleNext()
    }
}
