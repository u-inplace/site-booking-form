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
        this.#model = BookingModel.getInstance()
        this.#model.steps = Steps

        this.#slider = Slider.getInstance()
        this.#sequence = new Sequence()
        this.#slider.sequence = this.#sequence

        // Add handler for slider changes
        this.#slider.onChange = this.onChange.bind(this)

        // Init all steps
        Object.values(Steps).forEach(s => s.init())

        // Activate first step as 'back' to avoid autofollow
        DOM.slider.setActive(0)
        Steps[0].onActive('back')
    }

    onChange(event) {
        Steps[this.#slider.current].onActive(event)
    }
}
