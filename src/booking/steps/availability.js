/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import _ from 'lodash'
import CalendarController from '../../calendar/main'
import { SERVICE, STEP } from '../constants'
import DOM from '../dom'
import BaseStep from './base'

/**
 * @typedef {Object} Opening
 * @property {Date} start
 * @property {Date} end
 * @property {string} start_time
 * @property {Employee} employee
 */

/**
 * Availability Step Controller
 * @class
 * @constructor
 * @public
 */
export default class AvailabilityStep extends BaseStep {
    #calendar

    /**
     * Openings for a day
     * @type {Opening[]}
     * @protected
     */
    openings

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
     * Load all available openings
     * An opening has the following structure
     *
     * @typedef {Object} Employee
     * @property {String} id
     * @property {String} first_name
     * @property {String} last_name
     * @property {String} allergies
     *
     * @param  {string} day
     * @param  {Opening[]} openings
     *
     * */
    onDayChange(day, openings) {
        // Get template checkbox
        const template = document.getElementById('start-time-template')

        // Store day options
        this.openings = openings

        // Clean up existing entries
        document
            .getElementById('start-time-block')
            ?.querySelectorAll('.start-time, .team-member')
            ?.forEach(e => e.parentNode.removeChild(e))

        if (_.isEmpty(openings)) document.getElementById('aval-warning').classList.add('msg-active')
        else document.getElementById('aval-warning').classList.remove('msg-active')

        _.uniqBy(openings, 'start_time').forEach(open => {
            this.createOptionsFromTemplate(template, {
                className: 'start-time',
                parentId: 'start-time-block',
                labelClass: 'start-time-text',
                labelText: open.start_time,
                radioClass: 'start-time-radio',
                radioEvent: 'click',
                radioEventHandler: this.onStartTimeSelect,
                radioValue: open.start_time
            })
        })
    }

    /**
     * handle start time selection
     * @param {HTMLInputElement} selected
     */
    onStartTimeSelect(selected) {
        // Clean up existing entries
        document
            .getElementById('start-time-block')
            ?.querySelectorAll('.team-member')
            ?.forEach(e => e.parentNode.removeChild(e))

        const start_time = selected.value
        const template = document.getElementById('team-member-template')

        _.filter(this.openings, { start_time }).forEach(open => {
            this.createOptionsFromTemplate(template, {
                className: 'team-member',
                parentId: 'team-member-block',
                labelClass: 'team-member-name',
                labelText: open.employee.first_name,
                radioClass: 'team-member-radio',
                radioValue: open.start_time
            })
        })
    }

    /**
     * Create a node copy from template
     *
     * @typedef {Object} Conf
     * @property {String} className
     * @property {String} parentId
     * @property {String} labelClass
     * @property {String} labelText
     * @property {String} radioClass
     * @property {String} radioValue
     * @property {String} radioEvent
     * @property {Function} radioEventHandler
     *
     * @param {HTMLObjectElement} template
     * @param {Conf} conf
     * @returns {HTMLObjectElement} node
     */
    createOptionsFromTemplate(template, conf) {
        const node = template.cloneNode(true)

        node.setAttribute('id', '')
        node.style.display = 'flex'
        node.classList.add(conf.className)

        // Handle clicks on option
        const radio = node.getElementsByClassName(conf.radioClass)[0]
        radio.setAttribute('id', '')
        radio.value = conf.radioValue

        const label = node.getElementsByClassName(conf.labelClass)[0]
        label.innerText = conf.labelText

        document.getElementById('start-time-block').appendChild(node)

        if (conf.radioEvent) {
            radio.addEventListener(conf.radioEvent, conf.radioEventHandler)
            radio.addEventListener(conf.radioEvent, () => console.log('cliked'))
        }

        return node
    }
}
