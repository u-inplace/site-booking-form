/* eslint-disable no-var */
/* eslint-disable max-classes-per-file */

import { SERVICE, STEP } from './constants'
import DOM from './dom'
import Steps from './steps'

/**
 * Estimation calc
 */
const getEstimation = () =>
    Math.floor(
        Object.values(Steps).reduce((acc, s, i) => {
            console.log(`Estimation Step ${i + 1}: ${s ? s?.getDuration() : 0}`)
            // eslint-disable-next-line no-param-reassign
            acc += s ? s.getDuration() : 0
            return acc
        }, 3.0)
    )

const setEstimation = estimation => {
    document.getElementById('duration').nextElementSibling.noUiSlider.set(estimation)
}

/**
 * Add handlers
 */

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
const sliderController = function () {
    // eslint-disable-next-line no-undef
    var slider = new W_SLIDER_CONTROLLER('#booking-slider')

    class Sequence {
        constructor() {
            this._current = 0
            let seq = [STEP.Services]
            if (DOM.isServiceSelected(SERVICE.Ironing)) seq.push(STEP.Ironing)
            if (DOM.isServiceSelected(SERVICE.Cleaning))
                seq = seq.concat(Object.values(STEP.Cleaning).map(e => e))
            seq = seq.concat([STEP.Duration, STEP.Frequency, STEP.Availability, STEP.Contact])
            this.list = seq
        }

        get next() {
            this._current++
            console.log(`Seq : ${this.list} ; curr : ${this._current}`)
            return this.list[this._current] - 1
        }

        get prev() {
            this._current--
            console.log(`Seq : ${this.list} ; curr : ${this._current}`)
            return this.list[this._current] - 1
        }

        get total() {
            return this.list.length
        }

        get current() {
            return this._current + 1
        }
    }

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    const toggleNext = function () {
        const isDisabled = Steps[slider.current()]?.isNextDisabled()
        DOM.setNextButtonDisabled(isDisabled)
    }

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    const setStepNav = function (seq) {
        document.getElementsByClassName('step-number')[slider.current() - 1].innerHTML = `Step ${
            seq.current
        }/${seq.current === 1 ? '-' : seq.total}`
    }

    // Handle step validations
    DOM.setNextButtonDisabled(true)

    // Setup event handlers
    Object.values(Steps).forEach(s => {
        s.getObserved().forEach(o => {
            // eslint-disable-next-line no-param-reassign
            o.checked = false
            o.addEventListener(s.event, toggleNext)
        })
    })

    let sequence = {}

    const onNext = () => {
        if (slider.current() === STEP.Services) sequence = new Sequence()

        const { next } = sequence
        slider.goto(next)
        setStepNav(sequence)

        switch (slider.current()) {
            case STEP.Duration:
                // slider.current already points to the next slide
                setEstimation(getEstimation())
                console.log(getEstimation())
                break
            default:
                toggleNext()
                break
        }
    }

    const onBack = () => {
        const { prev } = sequence
        slider.goto(prev)
        setStepNav(sequence)
        toggleNext()
    }

    $('#booking-slider')
        .on('click', '.next-button-slide', onNext)
        .on('click', '.back-button-slide', onBack)
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || []
Webflow.push(sliderController)
