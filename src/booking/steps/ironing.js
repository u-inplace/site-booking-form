/* eslint-disable class-methods-use-this */

import { SERVICE, STEP } from '../constants'
import DOM from '../dom'
import BaseStep from './base'
import ToggleWatcher from './watcher'

export default class IroningStep extends BaseStep {
    constructor() {
        super(STEP.Ironing)
    }

    get isNextDisabled() {
        return !DOM.getSelectedIroning()
    }

    get toggleNextWatcher() {
        return new ToggleWatcher(DOM.queryOptions('ironing-size'), 'click')
    }

    get duration() {
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
    }
}
