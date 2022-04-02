import BaseStep from './base'
import ToggleWatcher from './watcher'

/**
 * Step with multiple validations for next button
 */
export default class CompoundStep extends BaseStep {
    #steps

    constructor(stepNo, ...steps) {
        super(stepNo)
        this.#steps = steps
    }

    get isNextDisabled() {
        return this.#steps.reduce((acc, s) => acc || s.isNextDisabled, false)
    }

    get toggleNextWatcher() {
        const set = new ToggleWatcher()
        this.#steps.forEach(s => set.push(s.toggleNextWatcher.list))
        return set
    }

    get duration() {
        return this.#steps.reduce((acc, s) => acc + s.duration, 0)
    }

    onNext() {
        super.onNext()
    }

    onBack() {
        super.onBack()
    }
}
