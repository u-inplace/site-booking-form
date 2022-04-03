/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import _ from 'lodash'
import CalendarController from '../../calendar/main'
import { slugify } from '../../helpers/text'
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

    /**
     * Team Members
     * @typedef {{fileId: string, url: string }} Image
     * @typedef {Object} TeamMember
     * @property {String} name
     * @property {String} slug
     * @property {String} email
     * @property {Image} avatar
     */
    /**
     * @type {TeamMember[]}
     * @protected
     */
    team

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

        // Get all team members from Webflow CMS
        this.#fetchTeam()
    }

    /**
     * Fetch team members from webflow CMS
     */
    async #fetchTeam() {
        const url = new URL('https://inplace-booking.azurewebsites.net/api/collection')
        const params = new URLSearchParams({
            code: 'XZlUaOpBh4l7DhFKMgxg6j%2FcXWWRuv%2FPym6r7GvXuXjjcTpiSLGEQg%3D%3D',
            name: 'team'
        })

        url.search = params
        const res = await fetch(url)
        const team = await res.json()

        this.team = team
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
        DOM.calendar.openings.cleanUp()

        // Hide Team block
        DOM.calendar.team.hideBlock()

        if (_.isEmpty(openings)) DOM.calendar.openings.showWarning()
        else DOM.calendar.openings.hideWarning()

        _.uniqBy(openings, 'start_time').forEach(open => {
            this.createOptionsFromTemplate(template, {
                className: 'start-time',
                parentId: 'start-time-block',
                labelClass: 'start-time-text',
                labelText: open.start_time,
                radioGroup: 'start-time',
                radioEvent: 'click',
                radioEventHandler: this.onStartTimeSelect.bind(this),
                radioValue: open.start_time
            })
        })
    }

    /**
     * handle start time selection
     * @param {MouseEvent} event
     */
    onStartTimeSelect(event) {
        // Clean up existing entries
        DOM.calendar.team.cleanUp()

        DOM.calendar.team.showBlock()
        const start_time = event.target.value
        const template = DOM.calendar.team.memberTemplate

        _.filter(this.openings, { start_time }).forEach(open => {
            const node = this.createOptionsFromTemplate(template, {
                className: 'team-member',
                parentId: 'team-members-block',
                labelClass: 'team-member-name',
                labelText: open.employee.first_name,
                radioGroup: 'team-member',
                radioValue: slugify(`${open.first_name} ${open.last_name}`)
            })

            // Get profile picture from webflow collections
            const avatar = _.find(this.team, {
                name: `${open.employee.first_name} ${open.employee.first_name}`
            })?.avatar

            avatar?.url && (node.querySelector('.team-avatar').src = avatar.url)
        })

        // Trigger slide resize
        this.slider.resize()
    }

    /**
     * Create a node copy from template
     *
     * @typedef {Object} Conf
     * @property {String} className
     * @property {String} parentId
     * @property {String} labelClass
     * @property {String} labelText
     * @property {String} radioGroup
     * @property {String} radioValue
     * @property {String} radioEvent
     * @property {Function} radioEventHandler
     *
     * @param {HTMLDivElement} template
     * @param {Conf} conf
     * @returns {HTMLObjectElement} node
     */
    createOptionsFromTemplate(template, conf) {
        const node = template.cloneNode(true)

        node.setAttribute('id', '')
        node.style.display = 'flex'
        node.classList.add(conf.className)

        // Handle clicks on option
        const radio = node.querySelector(`input[name*='${conf.radioGroup}']`)
        radio.setAttribute('id', '')
        radio.value = conf.radioValue
        if (conf.radioEvent) {
            radio.addEventListener(conf.radioEvent, conf.radioEventHandler)
            radio.addEventListener(conf.radioEvent, () => console.log('cliked'))
        }

        const label = node.querySelector(`.${conf.labelClass}`)
        label.innerText = conf.labelText

        document.getElementById(conf.parentId).appendChild(node)

        return node
    }
}
