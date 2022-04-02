/* eslint-disable class-methods-use-this */
import CalendarController from '../../calendar/main'
import { STEP } from '../constants'
import BaseStep from './base'

export default class AvailabilityStep extends BaseStep {
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
