import dom from '../helpers/dom'
import NavigationController from './navigation'
import BookingOptions from './options'
import Sequence, { STEP } from './sequence'

export default class StepController {
    /**
     * @type {HTMLFormElement}
     */
    form

    /**
     * @type {NavigationController}
     */
    nav

    /**
     * @type {BookingOptions}
     */
    ops

    /**
     * Create new StepController
     * @param {import('./sequence').StepCode} curr Current step
     * @param {string} formId Step form Id
     */
    constructor(curr, formId = 'wf-form-step') {
        this.form = dom.id(formId)
        this.nav = new NavigationController({ formId, sequence: new Sequence(curr) })
        this.ops = new BookingOptions()
        this.validateState()
    }

    /**
     * Initialize controller
     */
    init() {
        this.setupInputHandlers()
        dom.nextButtonDisabled = true
        this.toggleNext()
        this.updateNav()
    }

    /**
     * Create event handlers
     */
    setupInputHandlers() {
        this.form.querySelectorAll('input').forEach(input => {
            // Do not mess with submit button
            if (input.type === 'submit') return

            const inputEvent = {
                radio: 'click',
                number: 'input'
            }

            const event = inputEvent[input.type] || 'change'

            input.addEventListener(event, this.toggleNext.bind(this))

            // Sometimes inputs start checked for no reason
            // eslint-disable-next-line no-param-reassign
            // input.checked = false
        })
    }

    /**
     * Check if a booking session cookie exists with booking options
     * Otherwise, redirect to /booking/services
     */
    validateState() {
        // eslint-disable-next-line no-debugger
        debugger
        if (!this.ops.isValid || !this.ops.postalCode) {
            console.error('invalid options')
            this.nav.goto(STEP.PostalCode)
        } else if (this.ops.services.length === 0) {
            console.error('no service')
            this.nav.goto(STEP.Services)
        }
    }

    /**
     * Toggle next button active
     */
    toggleNext() {
        dom.nextButtonDisabled = this.isNextDisabled
    }

    /**
     * Control next button
     */
    // eslint-disable-next-line class-methods-use-this
    get isNextDisabled() {
        return false
    }

    /**
     * Update Nav step count
     */
    updateNav() {
        dom.id('step-nav').innerHTML = `Step ${this.nav.sequence.currentIndex}/${
            this.nav.sequence.total - 1
        }`
    }
}
