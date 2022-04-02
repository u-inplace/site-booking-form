/* eslint-disable class-methods-use-this */
import _ from 'lodash'
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
        this.#calendar = new CalendarController(
            'availability-cal',
            {
                postalCode: DOM.postalCode.value,
                duration: DOM.duration,
                recurrence: DOM.occurrence
            },
            this.onDayChange.bind(this)
        )

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

    /**
     * Load all available options
     * An option has the following structure
     * {
        start: new Date(slot.start_time),
        end: new Date(slot.end_time),
        start_time: slot.label,
        employee: {
            id: slot.affiliate_worker.worker_contract_id,
            first_name: slot.affiliate_worker.first_name,
            last_name: slot.affiliate_worker.last_name,
            allergies: slot.affiliate_worker.allergies
        }
    }
     */
    onDayChange(day, options) {
        // Get template checkbox
        const template = document.getElementById('start-time-template')

        // Clean up existing entries
        document
            .getElementById('start-time-block')
            ?.querySelectorAll('.start-time')
            ?.forEach(e => e.parentNode.removeChild(e))

        _.uniqBy(options, 'start_time').forEach(option => {
            const node = template.cloneNode(true)

            node.setAttribute('id', '')
            node.style.display = 'flex'

            // Handle clicks on option
            const radio = node.getElementsByClassName('start-time-radio')[0]
            radio.addEventListener('click', this.onStartTimeSelect.bind(this))
            radio.setAttribute('id', '')
            radio.value = option.start_time

            const label = node.getElementsByClassName('start-time-text')[0]
            label.innerText = option.start_time

            document.getElementById('start-time-block').appendChild(node)

            node.classList.add('start-time')
        })
    }

    /**
     * handle start time selection
     * @param {*} e
     */
    onStartTimeSelect() {}
}
