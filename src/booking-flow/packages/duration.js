/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'

class Step extends StepController {
    cookie

    constructor() {
        super(STEP.Duration)
        this.cookie = window.FpCookie
    }

    /**
     * @returns {boolean}
     */
    get isNextDisabled() {
        return !dom.getRadio('frequency', true)
    }
}

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new Step()
    step.init()
})
