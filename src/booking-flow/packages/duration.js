/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import dom from '../helpers/dom'

/**
 * @typedef {Object} CookieOptions
 * @property {string} cleaning-bathrooms
 * @property {string} cleaning-bedrooms
 * @property {boolean} extra-cabinets
 * @property {boolean} extra-fridge
 * @property {boolean} extra-oven
 * @property {boolean} extra-windows
 * @property {string} ironing
 * @property {string} postal-code
 * @property {boolean} service-cleaning
 * @property {boolean} service-cooking
 * @property {boolean} service-grocery
 * @property {boolean} service-ironing
 */

class OptionsDuration {
    /**
     * @type {CookieOptions}
     */
    ops

    /**
     *
     * @param {CookieOptions} options
     */
    constructor(options) {
        this.ops = options
    }

    get total() {
        return 3 + this.services + this.ironing + this.cleaning
    }

    get services() {
        const services = Object.keys(this.ops).filter(o => o.startsWith('service-'))
        let total = 0
        if (services.length > 1) {
            total += this.ops['service-cooking'] ? 0.5 : 0
            total += this.ops['service-grocery'] ? 0.5 : 0
        }
        return total
    }

    get ironing() {
        if (!this.ops['service-ironing']) return 0

        const ironing = this.ops.ironing.replace('ironing-size-', '')
        switch (ironing) {
            case 'xs':
                return 0.5
            case 's':
                return 1
            case 'm':
                return 2
            case 'l':
                return 3
            case 'xl':
                return 4
            default:
                return 0
        }
    }

    get cleaning() {
        if (!this.ops['service-cleaning']) return 0

        // Extras
        let total = this.ops['extra-windows'] ? 1 : 0
        total += this.ops['extra-cabinets'] ? 1 : 0
        total += this.ops['extra-fridge'] ? 0.5 : 0
        total += this.ops['extra-oven'] ? 0.5 : 0

        // Bedroom
        const bedroom = this.ops['cleaning-bedrooms']
        const bathroom = this.ops['cleaning-bathrooms']
        switch (bedroom) {
            case '3':
            case '4':
                total += 1
                break
            case '5+':
                total += 2
                break
            default:
                break
        }

        switch (bathroom) {
            case '2':
                total += 1
                break
            case '3':
                total += 2
                break
            case '4+':
                total += 3
                break
            default:
                break
        }
        return total
    }
}

class Step extends StepController {
    cookie

    constructor() {
        super(STEP.Duration)
        this.cookie = window.FpCookie
    }

    /**
     * Calculate estimation
     */
    init() {
        super.init()
        this.estimation = this.estimation
    }

    get estimation() {
        const options = new OptionsDuration(this.cookie.store)
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

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new Step()
    step.init()
})
