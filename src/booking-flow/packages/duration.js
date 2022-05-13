/* eslint-disable class-methods-use-this */

import Estimation from '../controllers/estimation'
import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'

class Step extends StepController {
    constructor() {
        super(STEP.Duration)
    }

    /**
     * Calculate estimation
     */
    init() {
        super.init()
        this.estimation = this.estimation
    }

    get estimation() {
        const options = new Estimation()
        const { total } = options

        return total
    }

    set estimation(total) {
        dom.id('duration').nextElementSibling.noUiSlider.set(total)
    }

    /**
     * @returns {boolean}
     */
    get isNextDisabled() {
        return !dom.getRadio('frequency', true)
    }
}

// Dependency on NoUISlider requires this step to be initialised by
// webflow script
window.Step = Step
