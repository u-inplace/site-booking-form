/* eslint-disable class-methods-use-this */
/**
 * Step configuration
 */

import BookingModel from '../model'
import Slider from '../slider'

export default class Step {
    slider
    model

    constructor() {
        this.slider = Slider.getInstance()
        this.model = BookingModel.getInstance()
    }

    /**
     * @typedef {Object} Observed
     * @property {HTMLElement} elem
     * @property {string} event
     * @property {Function} handler
     */

    /**
     * @returns {Observed[]}
     */
    get observed() {
        return []
    }

    get isNextDisabled() {
        return false
    }

    get duration() {
        return 0
    }

    get autoFollow() {
        return false
    }

    /**
     * Hook events with handlers
     *
     * @param {Observed[]} set
     */
    wireEvents(set) {
        set.forEach(o => o?.elem?.addEventListener(o.event, o.handler))
    }

    /**
     * Create event handlers for observed attributes
     * expects an array of
     *  elem
     *  event = 'click'
     *  handler = fn
     */
    init() {
        this.wireEvents(this.observed)
    }
}
