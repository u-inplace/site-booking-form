/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import _ from 'lodash'
import CalendarController from '../../calendar/main'
import { SERVICE, STEP } from '../constants'
import DOM from '../dom'
import BaseStep from './base'
import ToggleWatcher from './watcher'

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
     * @property {Image} profile-picture
     */
    /**
     * @type {TeamMember[]}
     * @protected
     */
    team

    constructor() {
        super(STEP.Availability)
    }

    get isNextDisabled() {
        return !DOM.getRadio('team-member', true)
    }

    onActive(event) {
        // Only clean up if going from a previous page
        if (event === 'back') return

        super.onActive()

        // Get all team members from Webflow CMS
        this.#fetchTeam()

        // Clean up existing entries
        DOM.calendar.team.cleanUp()
        this.toggleNext()

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
     * Fetch team members from webflow CMS
     */
    async #fetchTeam() {
        const url = new URL('https://inplace-booking.azurewebsites.net/api/collection')
        const params = new URLSearchParams({
            code: 'Itrex4w/daAwDFd78PsawdASdJyo9clkm1OOhG0Z3GLEe6m484/49A==',
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
            this.copyTemplate(template, {
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

        // Set start and end time on hidden inputs
        document.getElementById('start-timestamp').value = this.openings[0].start.toISOString()
        document.getElementById('end-timestamp').value = this.openings[0].end.toISOString()

        _.filter(this.openings, { start_time }).forEach(open => {
            const node = this.copyTemplate(template, {
                className: 'team-member',
                parentId: 'team-members-block',
                labelClass: 'team-member-name',
                labelText: open.employee.first_name,
                radioGroup: 'team-member',
                radioValue: open.employee.id,
                radioEvent: 'click',
                radioEventHandler: this.onTeamMemberSelect.bind(this)
            })

            // Get profile picture from webflow collections
            const avatar = _.find(this.team, {
                name: `${open.employee.first_name} ${open.employee.last_name}`
            })?.['profile-picture']

            avatar?.url && (node.querySelector('.team-avatar').src = avatar.url)

            // Save team member name in attribute
            node.querySelector('input').setAttribute(
                'member-name',
                `${open.employee.first_name} ${open.employee.last_name}`
            )
            node.querySelector('input').setAttribute(
                'member-first-name',
                `${open.employee.first_name}`
            )
        })

        // Wire events for next button
        this.toggleNextWatcher = new ToggleWatcher(DOM.queryRadio('team-member'), 'click')
        this.toggleNext()

        // Trigger slide resize
        this.slider.resize()
    }

    /**
     * Read attrs and store team member name into input fields
     * @param {MouseEvent} event
     */
    onTeamMemberSelect(event) {
        const member = event.target
        DOM.teamMember.name = member.getAttribute('member-name')
        DOM.teamMember.firstName = member.getAttribute('member-first-name')
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
     * @returns {HTMLObjectElement}
     */
    copyTemplate(template, conf) {
        const node = template.cloneNode(true)

        node.setAttribute('id', '')
        node.style.display = 'flex'
        node.classList.add(conf.className)

        // Handle clicks on option
        const radio = node.querySelector(`input[name*='${conf.radioGroup}']`)
        radio.setAttribute('id', '')
        radio.value = conf.radioValue
        if (conf.radioEvent) radio.addEventListener(conf.radioEvent, conf.radioEventHandler)

        const label = node.querySelector(`.${conf.labelClass}`)
        label.innerText = conf.labelText

        document.getElementById(conf.parentId).appendChild(node)

        return node
    }
}
