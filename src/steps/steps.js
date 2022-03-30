/** *
 * STEPS CONFIGURATION
 ** */

import { EXTRA, SERVICE, STEP } from './constants'
import DOM from './dom'

class StepConfig {
    constructor(isNextDisabled, getObserved, getDuration = () => 0, event = 'change') {
        this.isNextDisabled = isNextDisabled
        this.getObserved = getObserved
        this.getDuration = getDuration
        this.event = event
    }
}

const Steps = {
    [STEP.Services]: new StepConfig(
        () => DOM.getSelectedServices().length === 0,
        () => DOM.queryServices(),
        () => {
            const services = DOM.getSelectedServices()
            let total = 0
            if (services.length > 1) {
                total += DOM.isServiceSelected(SERVICE.Cooking) ? 0.5 : 0
                total += DOM.isServiceSelected(SERVICE.Grocery) ? 0.5 : 0
            }
            return total
        }
    ),
    [STEP.Ironing]: new StepConfig(
        () => !DOM.getSelectedIroning(),
        () => DOM.queryOptions('ironing-size'),
        () => {
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
        },
        'click'
    ),
    [STEP.Cleaning.Info]: new StepConfig(
        () => false,
        () => []
    ),
    [STEP.Cleaning.Extras]: new StepConfig(
        () => false,
        () => DOM.queryCleaningExtras(),
        () => {
            if (!DOM.isServiceSelected(SERVICE.Cleaning)) return 0

            let total = DOM.isExtraSelected(EXTRA.Windows) ? 1 : 0
            total += DOM.isExtraSelected(EXTRA.Cabinets) ? 1 : 0
            total += DOM.isExtraSelected(EXTRA.Fridge) ? 0.5 : 0
            total += DOM.isExtraSelected(EXTRA.Oven) ? 0.5 : 0
            return total
        }
    ),
    [STEP.Cleaning.Home]: new StepConfig(
        () => !DOM.isBedroomSelected() || !DOM.isBathroomSelected(),
        () => DOM.queryRadio('home-'),
        () => {
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
        }
    ),
    [STEP.Frequency]: new StepConfig(
        () => !DOM.getRadio('frequency', true),
        () => DOM.queryRadio('frequency'),
        () => 0,
        'click'
    ),
    [STEP.Cleaning.Supplies]: new StepConfig(
        () => !DOM.getOption('supplies-conf', true),
        () => DOM.queryOptions('supplies-conf')
    )
}

export default Steps
