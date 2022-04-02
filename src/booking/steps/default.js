/* eslint-disable class-methods-use-this */
import DOM from '../dom'
import Step from './step'

/**
 * Default step handler
 * Handles next and prev events
 */
export default class DefaultStep extends Step {
    stepNo
    sequence

    constructor(stepNo) {
        super()
        this.stepNo = stepNo
        this.sequence = this.slider.sequence
    }

    /**
     * Observer for next and back buttons
     */
    get observed() {
        const set = [
            {
                // Return only the button for the current slide
                elem: DOM.slider.nextButtonAll[this.stepNo],
                event: 'click',
                handler: this.onNext.bind(this)
            },
            {
                // Disconsider the first step, as it does not have a back button
                elem: DOM.slider.backButtonAll[this.stepNo - 1],
                event: 'click',
                handler: this.onBack.bind(this)
            },
            ...this.toggleNextWatcher.map(watcher => ({
                ...watcher,
                handler: this.toggleNext.bind(this)
            }))
        ]

        return set
    }

    /**
     * Should be implemented in child classes
     */
    get toggleNextWatcher() {
        return []
    }

    init() {
        super.init()
        DOM.setNextButtonDisabled(true)
    }

    toggleNext(dontAutoFollow = false) {
        const isDisabled = this.isNextDisabled
        DOM.setNextButtonDisabled(this.isNextDisabled)

        // Autofollow - used on first step
        // The call from onBack must be handled manually since this method
        // is also called above by event, where the parameter is not a boolean
        const stopAutoFollow = typeof dontAutoFollow === 'boolean' && dontAutoFollow
        if (!isDisabled && !stopAutoFollow && this.autoFollow) this.slider.next()
    }

    onNext() {
        this.slider.next()
        this.updateNav()
        this.toggleNext()
    }

    onBack() {
        this.slider.prev()
        this.updateNav()

        // Disable auto follow
        this.toggleNext(true)
    }

    /**
     * Triggered when slide becomes active
     */
    onActive() {
        return null
    }

    updateNav() {
        if (this.slider.current < 1) return

        document.getElementsByClassName('step-number')[this.stepNo - 1].innerHTML = `Step ${
            this.sequence.currentIndex
        }/${this.sequence.total - 1}`
    }
}
