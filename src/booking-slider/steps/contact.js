/* eslint-disable class-methods-use-this */
import { STEP } from '../constants'
import BaseStep from './base'

export default class ContactStep extends BaseStep {
    constructor() {
        super(STEP.Contact)
    }

    onActive(event) {
        super.onActive(event)
        this.setDefaultLang()
    }

    setDefaultLang() {
        // Get default user language from weglot
        const weGlotLang = document.querySelector('.wg-element-wrapper.sw8')
        const lang = weGlotLang?.querySelector('.w-dropdown-toggle')?.getAttribute('lang')
        document.getElementById(lang).click()
    }
}
