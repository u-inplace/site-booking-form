/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import '../../vivify.css'
import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'

class PostalCodeStep extends StepController {
    coverage = [
        '1070',
        '1160',
        '1082',
        '1000',
        '1040',
        '1140',
        '1190',
        '1083',
        '1130',
        '1050',
        '1090',
        '1081',
        '1020',
        '1080',
        '1120',
        '1060',
        '1210',
        '1030',
        '1180',
        '1170',
        '1200',
        '1150'
    ]

    constructor() {
        super(STEP.PostalCode)
    }

    init() {
        super.init()
        this.nav.sequence.init()
        this.pc.addEventListener('input', this.onPostalCode.bind(this))
    }

    get isNextDisabled() {
        const { pc } = this
        const { value } = pc
        return !this.coverage.includes(value)
    }

    get pc() {
        return dom.id('postal-code')
    }

    /**
     * Navigate automatically to the next step
     */
    toggleNext() {
        super.toggleNext()
        if (!this.isNextDisabled) dom.id('next-btn').click()
    }

    onPostalCode(e) {
        const pc = e.target
        const { value } = pc

        // show error message
        if (value.length === pc.maxLength && !this.coverage.includes(value)) {
            // Scroll back to top
            window.scrollTo({ top: 0, behavior: 'smooth' })
            dom.toast('alert-area')
        }
    }
}

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new PostalCodeStep()
    step.init()
})
