/* eslint-disable max-classes-per-file */
import dom from '../dom'

/**
 * Confirmation
 */
class ConfirmationDom {
    static get selected() {
        return dom.getRadio('ironing-size', true)?.value?.replace(/^ironing-size-/, '')
    }

    static submitButtonText
    static msgTimeout

    static done() {
        dom.id('wf-form-Booking').classList.add('completed')
        dom.id('form-done').classList.add('active')
    }

    static onSubmit() {
        const button = dom.id('button-submit')
        this.submitButtonText = button.value
        button.value = button.attributes['data-wait'].value
        button.disabled = true
        button.classList.add('wait')

        if (this.msgTimeout) {
            clearTimeout(this.msgTimeout)
            this.error.hide()
        }
    }

    static onSubmitDone() {
        const button = dom.id('button-submit')
        button.value = this.submitButtonText
        button.disabled = false
        button.classList.remove('wait')
    }

    static error = class {
        static set title(title) {
            dom.id('error-title').innerText = title
        }

        static set detail(title) {
            dom.id('error-detail').innerText = title
        }

        static toast(id) {
            this.msgTimeout = dom.toast(id)
        }
    }
}

const domConf = ConfirmationDom
export default domConf
