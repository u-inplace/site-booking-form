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
        document.getElementById(id).style.display = 'block'
    }

    /**
     * Slider
     */
    static slider = {
        element: () => document.getElementById('booking-slider'),
        nextButton: () =>
            document.getElementById('booking-slider').querySelector('.next-button-slide'),
        backButton: () =>
            document.getElementById('booking-slider').querySelector('.back-button-slide'),
        arrowRight: () =>
            document.getElementById('booking-slider').querySelector('.w-slider-arrow-left'),
        arrowLeft: () =>
            document.getElementById('booking-slider').querySelector('.w-slider-arrow-left')
    }
}
