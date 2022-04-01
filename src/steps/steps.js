/** *
 * STEPS CONFIGURATION
 ** */

import { EXTRA, SERVICE, STEP } from './constants'
import DOM from './dom'
import BookingModel from './model'
import { CompoundStepConfig, StepConfig } from './step_config'

/**
 * Cleaning Service Step
 */
const supplies = new StepConfig()
    .setNextDisabledFn(() => !DOM.getOption('supplies-conf', true))
    .setObservedFn(() => DOM.queryOptions('supplies-conf'))

const extras = new StepConfig()
    .setObservedFn(() => DOM.queryCleaningExtras())
    .setDurationFn(() => {
        if (!DOM.isServiceSelected(SERVICE.Cleaning)) return 0

        let total = DOM.isExtraSelected(EXTRA.Windows) ? 1 : 0
        total += DOM.isExtraSelected(EXTRA.Cabinets) ? 1 : 0
        total += DOM.isExtraSelected(EXTRA.Fridge) ? 0.5 : 0
        total += DOM.isExtraSelected(EXTRA.Oven) ? 0.5 : 0
        return total
    })

const home = new StepConfig()
    .setNextDisabledFn(() => !DOM.isBedroomSelected() || !DOM.isBathroomSelected())
    .setObservedFn(() => DOM.queryRadio('home-'))
    .setDurationFn(() => {
        if (!DOM.isServiceSelected(SERVICE.Cleaning)) return 0

        const bedroom = DOM.getRadio('home-bedrooms', true)?.value
        const bathroom = DOM.getRadio('home-bathrooms', true)?.value

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
    })

/**
 * Steps flow
 */

const onPostalCodeInput = e => {
    const pc = e.target
    if (pc.value.length > pc.maxLength) pc.value = pc.value.slice(0, pc.maxLength)

    if (pc.value.length === pc.maxLength && !BookingModel.coverage.includes(pc.value))
        DOM.postalCodeWarning.classList.add('msg-active')
    else DOM.postalCodeWarning.classList.remove('msg-active')
}

const Steps = {
    [STEP.PostalCode]: new StepConfig()
        .setNextDisabledFn(() => {
            const pc = DOM.postalCode
            return pc.value.length !== pc.maxLength || !BookingModel.coverage.includes(pc.value)
        })
        .setObservedFn(DOM.postalCode, 'input', onPostalCodeInput)
        .setAutoFollow(true),

    [STEP.Services]: new StepConfig()
        .setNextDisabledFn(() => DOM.getSelectedServices().length === 0)
        .setObservedFn(() => DOM.queryServices())
        .setDurationFn(() => {
            const services = DOM.getSelectedServices()
            let total = 0
            if (services.length > 1) {
                total += DOM.isServiceSelected(SERVICE.Cooking) ? 0.5 : 0
                total += DOM.isServiceSelected(SERVICE.Grocery) ? 0.5 : 0
            }
            return total
        }),

    [STEP.Ironing]: new StepConfig()
        .setNextDisabledFn(() => !DOM.getSelectedIroning())
        .setObservedFn(() => DOM.queryOptions('ironing-size'), 'click')
        .setDurationFn(() => {
            if (!DOM.isServiceSelected(SERVICE.Ironing)) return 0

            switch (DOM.getSelectedIroning()) {
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
        }),

    [STEP.Cleaning]: new CompoundStepConfig(supplies, extras, home),

    [STEP.Duration]: new StepConfig()
        .setNextDisabledFn(() => !DOM.getRadio('frequency', true))
        .setObservedFn(() => DOM.queryRadio('frequency'), 'click')
        .setDurationFn(() => 0)
}

export default Steps
