/* eslint-disable max-classes-per-file */
import _ from 'lodash'

/**
 * DOM query and manipulators
 */

export default class DOM {
    static queryOptions(id, checked = false) {
        return Array.from(
            document.querySelectorAll(`input[id*='${id}']${checked ? ':checked' : ''}`)
        )
    }

    static getOption(id, checked = false) {
        return document.querySelector(`input[id*='${id}']${checked ? ':checked' : ''}`)
    }

    static queryRadio(name, checked = false) {
        return Array.from(
            document.querySelectorAll(`input[name*='${name}']${checked ? ':checked' : ''}`)
        )
    }

    static getRadio(name, checked = false) {
        return document.querySelector(`input[name*="${name}"]${checked ? ':checked' : ''}`)
    }

    static setNextButtonDisabled(isDisabled) {
        const nextButtonList = document.querySelectorAll('.next-button-slide')
        Array.from(nextButtonList).forEach(nextButton => {
            // eslint-disable-next-line no-param-reassign
            nextButton.disabled = isDisabled
            if (isDisabled) nextButton.classList.add('disabled')
            else nextButton.classList.remove('disabled')
        })
    }

    /**
     * STEP: Services
     * */
    static queryServices(checked = false) {
        return DOM.queryOptions('service-', checked)
    }

    static getSelectedServices() {
        return DOM.queryServices(true).map(s => s.id.replace(/^.*-/, ''))
    }

    static isServiceSelected(service) {
        return _.includes(DOM.getSelectedServices(), service)
    }

    /**
     * STEP: Ironing
     */
    static getSelectedIroning() {
        return DOM.getRadio('ironing-size', true)?.value?.replace(/^ironing-size-/, '')
    }

    /**
     * STEP: Cleaning - Extras
     * */
    static queryCleaningExtras(checked = false) {
        return DOM.queryOptions('extra-', checked)
    }

    static getSelectedCleaningExtras() {
        return DOM.queryCleaningExtras(true).map(s => s.id.replace(/^.*-/, ''))
    }

    static isExtraSelected(extra) {
        return _.includes(DOM.getSelectedCleaningExtras(), extra)
    }

    /**
     * STEP: Cleaning - Home
     * */
    static isBedroomSelected() {
        return DOM.getRadio('home-bedrooms', true)
    }

    static isBathroomSelected() {
        return DOM.getRadio('home-bathrooms', true)
    }

    /**
     * General functions
     */
    static hide(id) {
        document.getElementById(id).style.display = 'none'
    }

    static display(id) {
        document.getElementById(id).style.display = 'inline-block'
        document.getElementById(id).style.visibility = 'visible'
        document.getElementById(id).style.transform = 'none'
    }

    /**
     * Postal Code
     */
    static get postalCode() {
        return document.getElementById('postal-code')
    }

    static get postalCodeWarning() {
        return document.getElementById('area-warning')
    }

    /**
     * Slider
     */
    static slider = class {
        static get element() {
            return document.getElementById('booking-slider')
        }

        static get nextButtonAll() {
            return document.getElementById('booking-slider').querySelectorAll('.next-button-slide')
        }

        static get backButtonAll() {
            return document.getElementById('booking-slider').querySelectorAll('.back-button-slide')
        }

        static setActive(stepNo) {
            document.getElementById(`step-${stepNo}`).classList.add('very-active')
        }

        static setInactive(stepNo) {
            document.getElementById(`step-${stepNo}`).classList.remove('very-active')
        }

        static getStepHeight(stepNo) {
            return document.getElementById(`step-${stepNo}`).offsetHeight
        }

        static set formHeight(height) {
            // Add some more for shadow box below
            height &&
                (document.getElementsByClassName('form-mask')[0].style.height = `${height + 150}px`)
        }
    }

    static get duration() {
        return document.getElementById('duration').value
    }

    static get occurrence() {
        return DOM.getRadio('frequency', true).value
    }

    /** *
     * Summary
     */
    static summary = class {
        static activeService(service) {
            document.getElementById(`summary-${service}`).classList.add('service-active')
        }

        static inactiveService(service) {
            document.getElementById(`summary-${service}`).classList.remove('service-active')
        }

        static set duration(time) {
            document.getElementById('summary-duration').innerText = time
        }

        static set occurrence(freq) {
            document.getElementById('summary-occurrence').innerText = freq
        }

        static set payment(value) {
            document.getElementById('summary-payment').innerText = value
        }
    }

    /**
     * Availability
     */
    static calendar = class {
        static openings = class {
            static cleanUp() {
                document
                    .getElementById('start-time-block')
                    ?.querySelectorAll('.start-time')
                    ?.forEach(e => e.parentNode.removeChild(e))
            }

            static showWarning() {
                document.getElementById('aval-warning').classList.add('msg-active')
            }

            static hideWarning() {
                document.getElementById('aval-warning').classList.remove('msg-active')
            }
        }

        static team = class {
            static showBlock() {
                document.getElementById('team-members-block').classList.add('visible')
            }

            static hideBlock() {
                document.getElementById('team-members-block').classList.remove('visible')
            }

            static cleanUp() {
                document
                    .getElementById('team-members-block')
                    ?.querySelectorAll('.team-member')
                    ?.forEach(e => e.parentNode.removeChild(e))
            }

            static get memberTemplate() {
                return document.getElementById('team-member-template')
            }
        }
    }

    /** *
     * FORM
     */

    static form = class {
        static submitButtonText
        static msgTimeout

        static done() {
            document.getElementById('wf-form-Booking').classList.add('completed')
            document.getElementById('form-done').classList.add('active')
        }

        static onSubmit() {
            const button = document.getElementById('button-submit')
            this.submitButtonText = button.value
            button.value = button.attributes['data-wait'].value
            button.disabled = true
            button.classList.add('wait')

            if (this.msgTimeout) {
                clearTimeout(this.msgTimeout)
                DOM.form.error.hide()
            }
        }

        static onSubmitDone() {
            const button = document.getElementById('button-submit')
            button.value = this.submitButtonText
            button.disabled = false
            button.classList.remove('wait')
        }

        static error = class {
            static set title(title) {
                document.getElementById('error-title').innerText = title
            }

            static set detail(title) {
                document.getElementById('error-detail').innerText = title
            }

            static show() {
                document.getElementById('form-error').classList.add('active')

                this.msgTimeout = setTimeout(() => {
                    document.getElementById('form-error').classList.remove('active')
                }, 1000 * 3)
            }

            static hide() {
                document.getElementById('form-error').classList.remove('active')
            }
        }
    }
}
