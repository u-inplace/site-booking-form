/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import { SERVICE } from '../common/constants'
import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'
import domServices from '../helpers/dom/services'

class Step extends StepController {
    constructor() {
        super(STEP.Services)

        // Restart sequence
        dom.id('next-btn').addEventListener('click', this.onNext.bind(this))
    }

    init() {
        super.init()
        this.nav.sequence.init()
    }

    validateState() {
        // Do nothing
    }

    onNext() {
        const { selected } = domServices
        this.nav.sequence.init({
            ironing: selected.includes(SERVICE.Ironing),
            cleaning: selected.includes(SERVICE.Cleaning)
        })
    }

    /**
     * @returns {boolean}
     */
    get isNextDisabled() {
        return domServices.selected.length === 0
    }

    updateNav() {
        // Do not update nav
    }
}

// Wait for DOM to load before query elements
document.addEventListener('DOMContentLoaded', () => {
    const step = new Step()
    step.init()
})
