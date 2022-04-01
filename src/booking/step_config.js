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
    #onEvent
    #durationFn
    #event
    #autoFollow

    constructor() {
        this.#isNextDisabledFn = () => false
        this.#observedFn = () => []
        this.#durationFn = () => 0
        this.#event = 'change'
        this.#autoFollow = false
        this.#onEvent = null
    }

    setNextDisabledFn(f) {
        this.#isNextDisabledFn = f
        return this
    }

    setObservedFn(f, event = 'change', onEvent = null) {
        this.#observedFn = f
        this.#event = event
        this.#onEvent = onEvent
        return this
    }

    setDurationFn(f) {
        this.#durationFn = f
        return this
    }

    setAutoFollow(auto) {
        this.#autoFollow = auto
        return this
    }

    get isNextDisabled() {
        return this.#isNextDisabledFn()
    }

    get observed() {
        return this.#observedFn().map(e => ({
            elem: e,
            event: this.#event,
            onEvent: this.#onEvent
        }))
    }

    get duration() {
        return this.#durationFn()
    }

    get autoFollow() {
        return this.#autoFollow
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
