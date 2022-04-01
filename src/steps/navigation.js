import { Calendar } from 'color-calendar'
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
    #calendar

    constructor() {
        this.#sequence = new Sequence()
        this.#slider = new Slider(this.#sequence)
        this.#model = new BookingModel(Steps)
    }

    init() {
        // Handle step validations
        DOM.setNextButtonDisabled(true)

        // Handle for next buttons
        DOM.slider.nextButton.forEach(e => e.addEventListener('click', this.onNext.bind(this)))
        DOM.slider.backButton.forEach(e => e.addEventListener('click', this.onBack.bind(this)))

        // Setup event handlers
        Object.values(Steps).forEach(s => {
            s.observed.forEach(o => {
                // eslint-disable-next-line no-param-reassign
                o.elem.checked = false

                // Custom extra callback for event
                if (o.onEvent) o.elem.addEventListener(o.event, o.onEvent)

                // Default handle next callback
                o.elem.addEventListener(o.event, this.#toggleNext.bind(this))
            })
        })
    }

    #updateNav() {
        document.getElementsByClassName('step-number')[this.#slider.current].innerHTML = `Step ${
            this.#sequence.current
        }/${this.#sequence.current === STEP.Services ? '-' : this.#sequence.total}`
    }

    #toggleNext(disableAutoFollow = false) {
        const isDisabled = Steps[this.#slider.current]?.isNextDisabled
        DOM.setNextButtonDisabled(isDisabled)

        // Autofollow - used on first step
        if (!isDisabled && !disableAutoFollow && Steps[this.#slider.current].autoFollow)
            this.#slider.next()
    }

    onNext() {
        // Recalculate the sequence when leaving the first step
        if (this.#slider.current === STEP.Services) this.#sequence.reset()

        this.#slider.next()
        this.#updateNav()

        switch (this.#slider.current) {
            case STEP.Duration:
                // Update duration when loading Duration step
                this.#model.updateEstimation()
                break
            case STEP.Availability:
                // Create new calendar controller
                this.#calendar = new Calendar()
                break
            default:
                break
        }

        this.#toggleNext()
    }

    onBack = () => {
        this.#slider.prev()
        this.#updateNav()
        // Disable auto follow
        this.#toggleNext(true)
    }
}
