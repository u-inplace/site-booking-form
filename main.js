const STEP = {
    Services: 1,
    Ironing: 2,
    Cleaning: {
        Info: 3,
        Home: 4,
        Extras: 5,
        Supplies: 6
    },
    Duration: 7,
    Frequency: 8,
    Contact: 9
}

const SERVICE = {
    Cleaning: 'cleaning',
    Ironing: 'ironing',
    Cooking: 'cooking',
    Grocery: 'grocery'
}

const EXTRA = {
    Windows: 'windows',
    Cabinets: 'cabinets',
    Fridge: 'fridge',
    Oven: 'oven'
}

/**
 * Helpers
 **/
const queryOptions = (id, checked = false) =>
    Array.from(document.querySelectorAll(`input[id*='${id}']${checked ? ':checked' : ''}`))

const getOption = (id, checked = false) =>
    document.querySelector(`input[id*='${id}']${checked ? ':checked' : ''}`)

const queryRadio = (name, checked = false) =>
    Array.from(document.querySelectorAll(`input[name*='${name}']${checked ? ':checked' : ''}`))

const getRadio = (name, checked = false) =>
    document.querySelector(`input[name*="${name}"]${checked ? ':checked' : ''}`)

const setNextButtonDisabled = isDisabled => {
    const nextButtonList = document.querySelectorAll('.next-button-slide')
    Array.from(nextButtonList).forEach(nextButton => {
        nextButton.disabled = isDisabled
        isDisabled ? nextButton.classList.add('disabled') : nextButton.classList.remove('disabled')
    })
}

/**
 * STEP: Services
 **/
const queryServices = (checked = false) => queryOptions('service-', checked)
const getSelectedServices = () => queryServices(true).map(s => s.id.replace(/^.*-/, ''))
const isServiceSelected = service => _.includes(getSelectedServices(), service)

/**
 * STEP: Ironing
 */
const getSelectedIroning = () =>
    getRadio('ironing-size', true)?.value?.replace(/^ironing-size-/, '')

/**
 * STEP: Cleaning - Extras
 **/
const queryCleaningExtras = (checked = false) => queryOptions('extra-', checked)
const getSelectedCleaningExtras = () => queryCleaningExtras(true).map(s => s.id.replace(/^.*-/, ''))
const isExtraSelected = extra => _.includes(getSelectedCleaningExtras(), extra)

/**
 * STEP: Cleaning - Home
 **/
const isBedroomSelected = () => getRadio('home-bedrooms', true)
const isBathroomSelected = () => getRadio('home-bathrooms', true)

/***
 * STEPS CONFIGURATION
 ***/

class StepConfig {
    constructor(isNextDisabled, getObserved, getDuration = () => 0, event = 'change') {
        this.isNextDisabled = isNextDisabled
        this.getObserved = getObserved
        this.getDuration = getDuration
        this.event = event
    }
}

const steps = {
    [STEP.Services]: new StepConfig(
        () => getSelectedServices().length === 0,
        () => queryServices(),
        () => {
            const services = getSelectedServices()
            let total = isServiceSelected(SERVICE.Cooking) ? 1 : 0
            total += isServiceSelected(SERVICE.Grocery) ? 1 : 0
            return total
        }
    ),
    [STEP.Ironing]: new StepConfig(
        () => !getSelectedIroning(),
        () => queryOptions('ironing-size'),
        () => {
            if (!isServiceSelected(SERVICE.Ironing)) return 0
            else {
                switch (getSelectedIroning()) {
                    case 'xs':
                        return 0.5
                    case 's':
                        return 1
                    case 'm':
                        return 2
                    case 'l':
                        return 3
                    case 'xl':
                        return 4
                    default:
                        return 0
                }
            }
        },
        'click'
    ),
    [STEP.Cleaning.Info]: new StepConfig(
        () => false,
        () => []
    ),
    [STEP.Cleaning.Extras]: new StepConfig(
        () => false,
        () => queryCleaningExtras(),
        () => {
            if (!isServiceSelected(SERVICE.Cleaning)) return 0
            else {
                const services = getSelectedCleaningExtras()
                let total = isExtraSelected(EXTRA.Windows) ? 1 : 0
                total += isExtraSelected(EXTRA.Cabinets) ? 1 : 0
                total += isExtraSelected(EXTRA.Fridge) ? 0.5 : 0
                total += isExtraSelected(EXTRA.Oven) ? 0.5 : 0
                return total
            }
        }
    ),
    [STEP.Cleaning.Home]: new StepConfig(
        () => !isBedroomSelected() || !isBathroomSelected(),
        () => queryRadio('home-'),
        () => {
            if (!isServiceSelected(SERVICE.Cleaning)) return 0
            else {
                const bedroom = getRadio('home-bedrooms', true)?.value
                const bathroom = getRadio('home-bathrooms', true)?.value

                let total = 0

                switch (bedroom) {
                    case '3':
                    case '4':
                        total += 1
                        break
                    case '5+':
                        total += 2
                        break
                    default:
                        break
                }

                switch (bathroom) {
                    case '2':
                        total += 1
                        break
                    case '3':
                        total += 2
                        break
                    case '4+':
                        total += 3
                        break
                    default:
                        break
                }

                return total
            }
        }
    ),
    [STEP.Frequency]: new StepConfig(
        () => !getRadio('frequency', true),
        () => queryRadio('frequency'),
        () => 0,
        'click'
    ),
    [STEP.Cleaning.Supplies]: new StepConfig(
        () => !getOption('supplies-conf', true),
        () => queryOptions('supplies-conf')
    )
}

/**
 * Estimation calc
 */
const getEstimation = () =>
    Math.floor(
        Object.values(steps).reduce((acc, s, i) => {
            console.log(`Estimation Step ${i + 1}: ${s ? s?.getDuration() : 0}`)
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
var Webflow = Webflow || []
Webflow.push(() => {
    class Sequence {
        constructor() {
            this._current = 0
            let seq = [STEP.Services]
            if (isServiceSelected(SERVICE.Ironing)) seq.push(STEP.Ironing)
            if (isServiceSelected(SERVICE.Cleaning))
                seq = seq.concat(Object.values(STEP.Cleaning).map(e => e))
            seq = seq.concat([STEP.Duration, STEP.Frequency, STEP.Contact])
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

    const toggleNext = function () {
        const isDisabled = steps[slider.current()]?.isNextDisabled()
        setNextButtonDisabled(isDisabled)
    }

    const setStepNav = function (seq) {
        document.getElementById('step-nav').innerHTML = `Step ${seq.current}/${
            seq.current === 1 ? '-' : seq.total
        }`
    }

    var slider = new W_SLIDER_CONTROLLER('#booking-slider')

    // Handle step validations
    setNextButtonDisabled(true)

    // Setup event handlers
    Object.values(steps).forEach(s => {
        s.getObserved().forEach(o => {
            o.checked = false
            o.addEventListener(s.event, toggleNext)
        })
    })

    let sequence = {}

    const onNext = () => {
        if (slider.current() === STEP.Services) sequence = new Sequence()

        const next = sequence.next
        console.log(`Next: ${next}`)
        slider.goto(next)

        setStepNav(sequence)

        switch (slider.current()) {
            case STEP.Duration:
                // slider.current already points to the next slide
                const estimation = getEstimation()
                setEstimation(estimation)
                console.log(estimation)
                break
            default:
                toggleNext()
                break
        }
    }

    const onBack = () => {
        const prev = sequence.prev
        console.log(`Prev: ${prev}`)
        slider.goto(prev)
        setStepNav(sequence)
        toggleNext()
    }

    $('#booking-slider')
        .on('click', '.next-button-slide', onNext)
        .on('click', '.back-button-slide', onBack)
})
