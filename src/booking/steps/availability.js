/* eslint-disable class-methods-use-this */
import CalendarController from '../../calendar/main'
import { STEP } from '../constants'
import DefaultStep from './default'

export default class AvailabilityStep extends DefaultStep {
    #calendar

    constructor() {
        super(STEP.Availability)
    }

    onActive() {
        super.onActive()
        // Update duration when loading Duration step
        this.#calendar = new CalendarController('availability-cal')
    }
}
