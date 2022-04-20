/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'

class PostalCodeStep extends StepController {
    constructor() {
        super(STEP.Services)
    }

    /**
     * @returns {boolean}
     */
    get isNextDisabled() {
        return false
    }
}

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new PostalCodeStep()
    step.init()
})

window.addEventListener('load', () => {
    console.log('onload')
    window.addEventListener('hashchange', () => console.log('hashchange'))
    window.addEventListener('popstate', () => console.log('onpopstate'))
})
