/* eslint-disable class-methods-use-this */
import CalendarController from '../../calendar/main'
import { SERVICE, STEP } from '../constants'
import DOM from '../dom'
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

        this.#createSummary()
    }

    /**
     * Read options and create a summary
     */
    #createSummary() {
        // Selected services
        const services = DOM.getSelectedServices()
        Object.values(SERVICE).forEach(s =>
            services.includes(s) ? DOM.summary.activeService(s) : DOM.summary.inactiveService(s)
        )

        const { duration } = DOM
        DOM.summary.duration = `${duration}h`
        DOM.summary.payment = `${duration} titres-services`

        const { occurrence } = DOM
        DOM.summary.occurrence = occurrence
    }
}
