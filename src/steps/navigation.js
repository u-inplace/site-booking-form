import { STEP } from './constants'
import DOM from './dom'
import BookingModel from './model'
import Sequence from './sequence'
import Steps from './steps'

export default class Navigation {
    #slider
    #sequence
    #model

    constructor() {
        this.#slider = new W_SLIDER_CONTROLLER('#booking-slider')
        this.#sequence = new Sequence()
        this.#model = new BookingModel(Steps)

        // Handle step validations
        DOM.setNextButtonDisabled(true)

        // Setup event handlers
        Object.values(Steps).forEach(s => {
            s.observed.forEach(o => {
                // eslint-disable-next-line no-param-reassign
                o.elem.checked = false
                o.elem.addEventListener(o.event, this.#toggleNext)
            })
        })

        // Hide all steps to avoid big steps making
        // the div bigger
        for (let i = 2; i <= this.#slider.count(); i++) {
            DOM.hide(`step-${i}`)
        }
    }

    set #step(seq) {
        document.getElementsByClassName('step-number')[
            this.#slider.current() - 1
        ].innerHTML = `Step ${seq.current}/${seq.current === 1 ? '-' : seq.total}`
    }

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    #toggleNext() {
        const isDisabled = Steps[this.#slider.current()]?.isNextDisabled
        DOM.setNextButtonDisabled(isDisabled)
    }

    onNext() {
        const { next } = this.#sequence

        // Unhide next step before moving on
        DOM.display(`step-${next + 1}`)

        this.#slider.goto(next)
        this.#step(this.#sequence)

        // Hide previous
        DOM.hide(`step-${next - 1}`)

        switch (this.#slider.current()) {
            case STEP.Duration:
                // slider.current already points to the next slide
                this.#model.estimation = this.#model.estimation
                console.log(this.#model.estimation)
                break
            default:
                this.#toggleNext()
                break
        }
    }

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    onBack = () => {
        const { prev } = this.#sequence

        // Display previous before moving back
        DOM.display(`step-${prev + 1}`)

        this.#slider.goto(prev)
        this.#step(this.#sequence)

        // Hide previous
        DOM.hide(`step-${prev + 2}`)

        this.#toggleNext()
    }
}
