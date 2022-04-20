/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import { SERVICE } from '../common/constants'
import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'

class ServicesStep extends StepController {
    constructor() {
        super(STEP.Services)

        // Restart sequence
        dom.id('next-btn').addEventListener('click', this.onNext.bind(this))
    }

    init() {
        super.init()
        this.nav.sequence.init()
    }

    onNext() {
        const { selected } = dom.steps.services
        this.nav.sequence.init({
            ironing: selected.includes(SERVICE.Ironing),
            cleaning: selected.includes(SERVICE.Cleaning)
        })
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
