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

const run = () => {
    console.log('Step: DOMContentLoaded')
    const step = new Step()
    step.init()
}

// Wait for DOM to load before query elements
// It's possible that DOMContent is already loaded, so check on document.readState
console.log('Step: Script loaded')
if (document.readyState !== 'loading') run()
else document.addEventListener('DOMContentLoaded', run)
