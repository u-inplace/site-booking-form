/* eslint-disable class-methods-use-this */
import { STEP } from '../constants'
import DOM from '../dom'
import DefaultStep from './default'
import ToggleWatcher from './watcher'

export default class DurationStep extends DefaultStep {
    constructor() {
        super(STEP.Duration)
    }

    get isNextDisabled() {
        return !DOM.getRadio('frequency', true)
    }

    get toggleNextWatcher() {
        return new ToggleWatcher(DOM.queryRadio('frequency'), 'click')
    }

    onNext() {
        super.onNext()
        // Update duration when loading Duration step
        this.model.updateEstimation()
    }
}
