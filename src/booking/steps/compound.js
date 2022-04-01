import DefaultStep from './default'
import ToggleWatcher from './watcher'

/**
 * Step with multiple validations for next button
 */
export default class CompoundStep extends DefaultStep {
    #steps

    constructor(stepNo, ...steps) {
        super(stepNo)
        this.#steps = steps
    }

    init() {
        this.#steps.forEach(s => s.init())
    }

    get isNextDisabled() {
        return this.#steps.reduce((acc, s) => acc || s.isNextDisabled, false)
    }

    get toggleNextWatcher() {
        return this.#steps.reduce((acc, s) => acc.push(s.toggleNextWatcher), new ToggleWatcher())
    }

    get duration() {
        return this.#steps.reduce((acc, s) => acc + s.duration, 0)
    }
}
