import dom from '../helpers/dom'
import Sequence from './sequence'

export default class NavigationController {
    sequence

    constructor({ formId = 'wf-form-step', sequence = new Sequence() }) {
        this.sequence = sequence

        // Submit = nextButton
        dom.id(formId).onsubmit = this.onNext.bind(this)
        dom.id('back-button')?.addEventListener('click', this.onBack.bind(this))

        // Browser history
        window.onpopstate = this.onHistoryBack.bind(this)
    }

    /**
     * @param {Event} e
     */
    onNext(e) {
        e.preventDefault()
        // eslint-disable-next-line no-restricted-globals
        history.pushState({}, null, location.href)
        window.location.href = this.sequence.next()
    }

    onBack() {
        window.location.href = this.sequence.prev()
    }

    onHistoryBack() {
        this.sequence.prev()
        // eslint-disable-next-line no-restricted-globals
        history.back()
    }
}
