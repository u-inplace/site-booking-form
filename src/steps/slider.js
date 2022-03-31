import DOM from './dom'
import Sequence from './sequence'
import './slider.css'

/**
 * Custom slider
 * Why? Cus' Webflow slider sucks
 */
export default class Slider {
    #sequence

    constructor(sequence) {
        this.#sequence = sequence || new Sequence()

        // Active first slide
        DOM.slider.setActive(0)

        // Events to resize form after each step
        this.resize = this.resize.bind(this)
        window.addEventListener('load', this.resize, false)
        window.addEventListener('resize', this.resize, false)
    }

    resize() {
        DOM.slider.formHeight = DOM.slider.getStepHeight(this.current)
    }

    set sequence(sequence) {
        this.#sequence = sequence
    }

    get current() {
        return this.#sequence.current
    }

    next() {
        // Set current step as inactive
        const { current } = this.#sequence
        DOM.slider.setInactive(current)

        // Get next in sequence and active it
        const { next } = this.#sequence
        DOM.slider.setActive(next)
    }

    prev() {
        // Set current step as inactive
        const { current } = this.#sequence
        DOM.slider.setInactive(current)

        // Get prev in sequence and active it
        const { prev } = this.#sequence
        DOM.slider.setActive(prev)
    }
}
