/* eslint-disable class-methods-use-this */
import { STEP } from '../constants'
import DOM from '../dom'
import BookingModel from '../model'
import BaseStep from './base'
import ToggleWatcher from './watcher'

export default class PostalCodeStep extends BaseStep {
    constructor() {
        super(STEP.PostalCode)
    }

    init() {
        super.init()
        // Autofocus on input
        DOM.postalCode.autofocus = true
        DOM.postalCode.focus()

        DOM.slider.setActive(0)
        this.slider.resize()
    }

    get isNextDisabled() {
        const pc = DOM.postalCode
        return pc.value.length !== pc.maxLength || !BookingModel.coverage.includes(pc.value)
    }

    get toggleNextWatcher() {
        return new ToggleWatcher([DOM.postalCode], 'input')
    }

    get observed() {
        return [
            ...super.observed,
            { elem: DOM.postalCode, event: 'input', handler: this.onPostalCodeInput }
        ]
    }

    onNext() {
        // Remove focus to hide keyboard
        DOM.postalCode.blur()
        document.activeElement.blur()
        super.onNext()
    }

    get autoFollow() {
        return true
    }

    updateNav() {
        // No such thing on this step
        return null
    }

    onPostalCodeInput(e) {
        const pc = e.target
        if (pc.value.length > pc.maxLength) pc.value = pc.value.slice(0, pc.maxLength)

        if (pc.value.length === pc.maxLength && !BookingModel.coverage.includes(pc.value))
            DOM.postalCodeWarningShow()
        else DOM.postalCodeWarningHide()
    }
}
