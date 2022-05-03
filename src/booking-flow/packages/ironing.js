/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import domIroning from '../helpers/dom/ironing'

class Step extends StepController {
    constructor() {
        super(STEP.Ironing)
    }

    /**
     * @returns {boolean}
     */
    get isNextDisabled() {
        return !domIroning.selected
    }
}

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new Step()
    step.init()
})
