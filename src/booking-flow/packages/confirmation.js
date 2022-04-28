/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import BookingOptions from '../controllers/options'
import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'

class Step extends StepController {
    /**
     * @type {BookingOptions}
     */
    ops

    constructor() {
        super(STEP.Confirmation)
        this.ops = new BookingOptions()
    }

    init() {
        super.init()
        this.#createSummary()
    }

    /**
     * Read options and create a summary
     */
    #createSummary() {
        // Selected services
        const { service, recurrence } = this.ops
        dom.summary.service = service
        dom.summary.recurrence = recurrence
    }
}

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new Step()
    step.init()
})
