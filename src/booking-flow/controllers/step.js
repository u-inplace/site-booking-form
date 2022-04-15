import dom from '../helpers/dom'
import NavigationController from './navigation'

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
     * Create new StepController
     * @param {string} formId Step form Id
     */
    constructor(formId = 'wf-form-step') {
        this.form = dom.id(formId)
        this.nav = new NavigationController()
    }

    /**
     * Initialize controller
     */
    init() {
        this.setupInputHandlers()
        dom.nextButtonDisabled = true
        this.toggleNext()
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
        })
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
}
