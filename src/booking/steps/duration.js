/* eslint-disable class-methods-use-this */
import { STEP } from '../constants'
import DOM from '../dom'
import BaseStep from './base'
import ToggleWatcher from './watcher'

export default class DurationStep extends BaseStep {
    constructor() {
        super(STEP.Duration)
    }

    get isNextDisabled() {
        return !DOM.getRadio('frequency', true)
    }

    get toggleNextWatcher() {
        return new ToggleWatcher(DOM.queryRadio('frequency'), 'click')
    }

    onActive(event) {
        // Update duration when loading Duration step
        if (event === 'next') this.model.updateEstimation()
        super.onActive(event)
    }
}
