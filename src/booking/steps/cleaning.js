/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

import { EXTRA, SERVICE, STEP } from '../constants'
import DOM from '../dom'
import CompoundStep from './compound'
import DefaultStep from './default'
import ToggleWatcher from './watcher'

class BaseCleaningStep extends DefaultStep {
    constructor() {
        super(STEP.Cleaning)
    }
}

class Supplies extends BaseCleaningStep {
    get isNextDisabled() {
        return !DOM.getOption('supplies-conf', true)
    }

    get toggleNextWatcher() {
        return new ToggleWatcher(DOM.queryOptions('supplies-conf'))
    }
}

class Extras extends DefaultStep {
    get toggleNextWatcher() {
        return new ToggleWatcher(DOM.queryCleaningExtras())
    }

    get duration() {
        if (!DOM.isServiceSelected(SERVICE.Cleaning)) return 0

        let total = DOM.isExtraSelected(EXTRA.Windows) ? 1 : 0
        total += DOM.isExtraSelected(EXTRA.Cabinets) ? 1 : 0
        total += DOM.isExtraSelected(EXTRA.Fridge) ? 0.5 : 0
        total += DOM.isExtraSelected(EXTRA.Oven) ? 0.5 : 0
        return total
    }
}

class Home extends BaseCleaningStep {
    get isNextDisabled() {
        return !DOM.isBedroomSelected() || !DOM.isBathroomSelected()
    }

    get toggleNextWatcher() {
        return new ToggleWatcher(DOM.queryRadio('home-'))
    }

    get duration() {
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
}

export default class CleaningStep extends CompoundStep {
    constructor() {
        super(STEP.Cleaning, new Supplies(), new Extras(), new Home())
    }
}
