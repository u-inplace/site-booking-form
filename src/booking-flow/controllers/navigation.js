import dom from '../helpers/dom'
import Sequence from './sequence'

export default class NavigationController {
    sequence

    constructor({ formId = 'wf-form-step', sequence = new Sequence() }) {
        this.sequence = sequence

        // Submit = nextButton
        dom.id(formId).onsubmit = this.onNext.bind(this)
        dom.id('back-button-flow')?.addEventListener('click', this.onBack.bind(this))

        // Browser history
        window.onpopstate = this.onHistoryBack.bind(this)
    }

    /**
     *
     * @param {Event} e
     */
    onNext(e) {
        e.preventDefault()
        window.location.href = this.sequence.next()
    }

    onBack() {
        window.location.href = this.sequence.prev()
    }

    onHistoryBack() {
        this.sequence.prev()
    }
}
