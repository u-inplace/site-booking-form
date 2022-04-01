import DOM from './dom'
import BookingModel from './model'
import Sequence from './sequence'
import Slider from './slider'
import Steps from './steps'

export default class Navigation {
    #slider
    #sequence
    #model

    init() {
        // Create model instance
        this.#model = BookingModel.instance
        this.#model.steps = Steps

        this.#slider = Slider.instance
        this.#sequence = new Sequence()
        this.#slider.sequence = this.#sequence

        Object.values(Steps).forEach(s => s.init())

        // Set event handlers for next and prev buttons
        DOM.slider.nextButtonAll.forEach(button =>
            button.addEventListener('click', this.onNext.bind(this))
        )
        DOM.slider.backButtonAll.forEach(button =>
            button.addEventListener('click', this.onBack.bind(this))
        )
        // // Handle step validations
        // DOM.setNextButtonDisabled(true)

        // Setup event handlers
        // Object.values(Steps).forEach(s => {
        //     s.observed.forEach(o => {
        //         // eslint-disable-next-line no-param-reassign
        //         // TODO HERE
        //         o.elem.checked = false
        //     })
        // })

        // // Autofocus on input
        // DOM.postalCode.autofocus = true
        // DOM.postalCode.focus()

        // this.#toggleNext()-
    }

    onNext() {
        Steps[this.#slider.current].onNext()
        Steps[this.#slider.current].onActive()
    }

    onBack() {
        Steps[this.#slider.current].onBack()
        Steps[this.#slider.current].onActive()
    }

    // #updateNav() {
    //     // if (this.#slider.current < 1) return

    //     document.getElementsByClassName('step-number')[
    //         this.#sequence.current - 1
    //     ].innerHTML = `Step ${this.#sequence.currentIndex}/${
    //         this.#sequence.current === STEP.Services ? '-' : this.#sequence.total - 1
    //     }`
    // }

    // #toggleNext(dontAutoFollow = false) {
    //     const isDisabled = Steps[this.#slider.current]?.isNextDisabled
    //     DOM.setNextButtonDisabled(isDisabled)

    //     // Autofollow - used on first step
    //     // The call from onBack must be handled manually since this method
    //     // is also called above by event, where the parameter is not a boolean
    //     const stopAutoFollow = typeof dontAutoFollow === 'boolean' && dontAutoFollow
    //     if (!isDisabled && !stopAutoFollow && Steps[this.#slider.current].autoFollow) {
    //         DOM.postalCode.blur()
    //         this.#slider.next()
    //     }
    // }

    // onNext() {
    // Recalculate the sequence when leaving the first step
    // if (this.#slider.current === STEP.Services) this.#sequence.reset(true)

    // this.#slider.next()
    // this.#updateNav()

    // switch (this.#slider.current) {
    //     // case STEP.Duration:
    //     //     // Update duration when loading Duration step
    //     //     this.#model.updateEstimation()
    //     //     break
    //     case STEP.Availability:
    //         // Create new calendar controller
    //         this.#calendar = new CalendarController('availability-cal')
    //         break
    //     default:
    //         break
    // }

    // this.#toggleNext()
}

// onBack = () => {
//     this.#slider.prev()
//     this.#updateNav()
//     // Disable auto follow
//     this.#toggleNext(true)
// }
