import { STEP } from './constants'
import DOM from './dom'
import BookingModel from './model'
import Sequence from './sequence'
import Steps from './steps'

export default class Navigation {
    #slider
    #sequence
    #model

    static #next() {
        DOM.slider.arrowRight().click()
    }

    static #back() {
        DOM.slider.arrowLeft().click()
    }

    constructor() {
        this.#slider = new W_SLIDER_CONTROLLER('#booking-slider')
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

        // Hide all steps to avoid big steps making
        // the div bigger
        for (let i = 1; i < this.#slider.count(); i++) {
            DOM.hide(`step-${i}`)
        }
    }

    #updateNav() {
        document.getElementsByClassName('step-number')[
            this.#slider.current() - 1
        ].innerHTML = `Step ${this.#sequence.current}/${
            this.#sequence.current === 1 ? '-' : this.#sequence.total
        }`
    }

    #toggleNext() {
        const isDisabled = Steps[this.#slider.current() - 1]?.isNextDisabled
        DOM.setNextButtonDisabled(isDisabled)
    }

    onNext() {
        // Create a new sequence when leaving the first step
        if (this.#slider.current() === 1) this.#sequence = new Sequence()

        const { next } = this.#sequence

        // Unhide next step before moving on
        DOM.display(`step-${next}`)

        Navigation.#next()

        this.#updateNav()

        // Hide previous
        DOM.hide(`step-${next - 1}`)

        switch (this.#slider.current() - 1) {
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

    onBack = () => {
        const { prev } = this.#sequence

        // Display previous before moving back
        DOM.display(`step-${prev}`)

        Navigation.#back()
        this.#updateNav()

        // Hide next
        DOM.hide(`step-${prev + 1}`)

        this.#toggleNext()
    }
}
