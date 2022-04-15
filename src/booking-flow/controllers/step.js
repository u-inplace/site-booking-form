import dom from '../helpers/dom'

export default class StepController {
    /**
     * @type {HTMLFormElement}
     */
    form

    /**
     * Create new StepController
     * @param {string} formId Step form Id
     */
    constructor(formId = 'step-form') {
        this.form = dom.id(formId)
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
            const event = input.type === 'radio' ? 'click' : 'change'
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
