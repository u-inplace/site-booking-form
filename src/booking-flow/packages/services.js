/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'

class ServicesStep extends StepController {
    constructor() {
        super(STEP.Services)
    }

    init() {
        super.init()
        this.nav.sequence.init()
    }

    /**
     * @returns {boolean}
     */
    get isNextDisabled() {
        return dom.steps.services.selected.length === 0
    }
}

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new ServicesStep()
    step.init()
})
