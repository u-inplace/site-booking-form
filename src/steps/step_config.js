/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
/**
 * Step configuration
*  Example
    new StepConfig()
        .setNextDisabledFn()
        .setObservedFn()
        .setDurationFn()
 */

import _ from 'lodash'

export class StepConfig {
    #isNextDisabledFn
    #observedFn
    #durationFn
    #event

    constructor() {
        this.#isNextDisabledFn = () => false
        this.#observedFn = () => []
        this.#durationFn = () => 0
        this.#event = 'change'
    }

    setNextDisabledFn(f) {
        this.#isNextDisabledFn = f
        return this
    }

    setObservedFn(f, event = 'change') {
        this.#observedFn = f
        this.#event = event
        return this
    }

    setDurationFn(f) {
        this.#durationFn = f
        return this
    }

    get isNextDisabled() {
        return this.#isNextDisabledFn()
    }

    get observed() {
        return this.#observedFn().map(e => ({ elem: e, event: this.#event }))
    }

    get duration() {
        return this.#durationFn()
    }
}

/**
 * Compounded Step Page
 */
export class CompoundStepConfig extends StepConfig {
    #steps

    constructor(...steps) {
        super()
        this.#steps = steps
    }

    get isNextDisabled() {
        return this.#steps.reduce((acc, s) => acc || s.isNextDisabled, false)
    }

    get observed() {
        return _.flatten(this.#steps.map(s => s.observed))
    }

    get duration() {
        return this.#steps.reduce((acc, s) => acc + s.duration, 0)
    }
}
