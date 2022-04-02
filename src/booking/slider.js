import DOM from './dom'
import Sequence from './sequence'
import './slider.css'

/**
 * Custom slider
 * Why? Cus' Webflow slider sucks
 */
export default class Slider {
    #sequence
    #onChange

    constructor(sequence) {
        this.#sequence = sequence || new Sequence()

        // Events to resize form after each step
        // Seems that this works sometimes, but not always when the page
        // is loading
        window.addEventListener('load', () => this.resize(), false)
        window.addEventListener('resize', () => this.resize(), false)
    }

    static getInstance() {
        this.instance ??= new Slider()
        return this.instance
    }

    set onChange(fn) {
        this.#onChange = fn
    }

    resize() {
        console.log(`Resize triggered: ${this.current}`)
        DOM.slider.formHeight = DOM.slider.getStepHeight(this.current)
    }

    set sequence(sequence) {
        this.#sequence = sequence
    }

    get sequence() {
        return this.#sequence
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

        this.resize()

        this.#onChange('next')
    }

    prev() {
        // Set current step as inactive
        const { current } = this.#sequence
        DOM.slider.setInactive(current)

        // Get prev in sequence and active it
        const { prev } = this.#sequence
        DOM.slider.setActive(prev)

        this.resize()

        this.#onChange('back')
    }
}
