/* eslint-disable class-methods-use-this */

import { SERVICE, STEP } from '../constants'
import DOM from '../dom'
import BaseStep from './base'
import ToggleWatcher from './watcher'

export default class ServicesStep extends BaseStep {
    constructor() {
        super(STEP.Services)
    }

    get isNextDisabled() {
        return DOM.getSelectedServices().length === 0
    }

    get toggleNextWatcher() {
        return new ToggleWatcher(DOM.queryServices())
    }

    get duration() {
        const services = DOM.getSelectedServices()
        let total = 0
        if (services.length > 1) {
            total += DOM.isServiceSelected(SERVICE.Cooking) ? 0.5 : 0
            total += DOM.isServiceSelected(SERVICE.Grocery) ? 0.5 : 0
        }
        return total
    }

    updateNav() {
        // No such thing on this step
        document.getElementsByClassName('step-number')[this.stepNo - 1].innerHTML = 'Step 1/-'
    }

    onNext() {
        this.sequence.reset(true)
        super.onNext()
    }
}
