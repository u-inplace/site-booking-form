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
        this.slider = Slider.instance
        this.model = BookingModel.instance
    }

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
     * Create event handlers for observed attributes
     * expects an array of
     *  elem
     *  event = 'click'
     *  handler = fn
     */
    init() {
        this.observed.forEach(o => o.elem.addEventListener(o.event, o.handler))
    }
}
