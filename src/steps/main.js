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
            console.log(`Estimation Step ${i + 1}: ${s ? s?.duration : 0}`)
            // eslint-disable-next-line no-param-reassign
            acc += s ? s.duration : 0
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
            if (DOM.isServiceSelected(SERVICE.Cleaning)) seq.push(STEP.Cleaning)
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
        const isDisabled = Steps[slider.current()]?.isNextDisabled
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
        s.observed.forEach(o => {
            // eslint-disable-next-line no-param-reassign
            o.elem.checked = false
            o.elem.addEventListener(o.event, toggleNext)
        })
    })

    // Hide all steps to avoid big steps making
    // the div bigger
    for (let i = 2; i <= slider.count(); i++) {
        DOM.hide(`step-${i}`)
    }

    let sequence = {}

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    const onNext = function () {
        if (slider.current() === STEP.Services) sequence = new Sequence()

        const { next } = sequence

        // Unhide next step before moving on
        DOM.display(`step-${next}`)

        slider.goto(next)
        setStepNav(sequence)

        // Hide previous
        DOM.hide(`step-${next - 1}`)

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

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    const onBack = function () {
        const { prev } = sequence

        // Display previous before moving back
        DOM.display(`step-${prev}`)

        slider.goto(prev)
        setStepNav(sequence)

        // Hide previous
        DOM.hide(`step-${prev + 1}`)

        toggleNext()
    }

    $('#booking-slider')
        .on('click', '.next-button-slide', onNext)
        .on('click', '.back-button-slide', onBack)
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
