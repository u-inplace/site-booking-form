/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import Cookies from 'js-cookie'
import BookingOptions from '../controllers/options'
import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import Team from '../fragments/teamMember'
import dom from '../helpers/dom'
import domConf from '../helpers/dom/confirmation'
import domSummary from '../helpers/dom/summary'
import './confirmation.css'

const SESSION_COOKIE = '__inplace_booking_session'
const FORM_ID = 'wf-form-booking'

class Step extends StepController {
    /**
     * @type {BookingOptions}
     */
    ops

    /**
     * @type {Team}
     */
    team

    member

    constructor() {
        super(STEP.Confirmation, FORM_ID)
        this.ops = new BookingOptions()
        this.team = new Team()
    }

    async init() {
        super.init()
        this.#createSummary()
        this.#setTeamMember()
        this.setupBookingSession()

        // eslint-disable-next-line no-undef
        const member = await MemberStack.onReady
        this.member = member
    }

    /**
     * No need to set input handlers for next button, since this is the
     * last step.
     * the input.checked = false fix is also messing with FpCookies unloading
     */
    setupInputHandlers() {
        dom.id(FORM_ID).onsubmit = this.onSubmit.bind(this)
    }

    /**
     * @typedef {Object} BookingResponse
     * @property {number} parent_booking_id
     * @property {number} booking_request_id
     * @property {string} start_timestamp
     * @property {string} start_date
     * @property {string} start_time
     * @property {string} end_timestamp
     * @property {string} end_date
     * @property {string} end_time
     * @property {string} duration
     * @property {RecurrenceType} recurrence
     * @property {BookingWebhookCustomer} customer
     * @property {BookingWebhookTeamMember} team
     * @property {BookingWebhookAddress} address
     * @property {CalendarEvents} events
     *
     *
     * @typedef {Object} BookingWebhookCustomer
     * @property {number} contract_id
     * @property {string} name
     * @property {string} email
     * @property {string} sodexo
     * @property {string} language
     *
     * @typedef {Object} BookingWebhookTeamMember
     * @property {number} contract_id
     * @property {string} name
     * @property {string} email
     * @property {string} sodexo
     * @property {string} phone
     *
     * @typedef {Object} BookingWebhookAddress
     * @property {string} id
     * @property {string} zip_code
     * @property {string} town
     * @property {string} street_name
     * @property {string} street_number
     *
     * @typedef {Object} CalendarEvents
     * @property {string} google
     * @property {string} outlook
     * @property {AppleCalendar} apple
     *
     * @typedef {Object} AppleCalendar
     * @property {string} url
     * @property {string} content
     * @property {string} ics B
     *
     * @typedef {"once" | "weekly" | "biweekly"} RecurrenceType
     */

    /**
     * Form Submission
     * @param {SubmitEvent} event
     */
    async onSubmit(event) {
        event.preventDefault()
        const form = event.target
        const data = new FormData(form)

        /** @type {BookingForm} */
        const json = Object.fromEntries(data.entries())
        const booking = this.makeBooking(json)
        const url = new URL(form.attributes.action.value)

        try {
            domConf.onSubmit()

            const resRaw = await fetch(url, {
                method: 'POST',
                headers: {
                    contentType: 'application/json',
                    dataType: 'json'
                },
                body: JSON.stringify(booking)
            })

            /** @type {BookingResponse} */
            const res = await resRaw.json()

            if (resRaw.status >= 300) {
                this.logError(resRaw, res)

                if (res?.errors?.sodexo_reference) domConf.error.toast('toast-sodexo')
                else if (res?.error === 'UNAVAILABLE_TIME_SLOT')
                    domConf.error.toast('toast-unavailable-slot')
                else if (res?.error === 'customer_unavailability')
                    domConf.error.toast('toast-unavailable-customer')
                else domConf.error.toast('toast-submit-error')

                domConf.onSubmitDone()
            } else {
                this.handleNewBooking(res)
                setTimeout(() => {
                    domConf.done()
                }, 1000 * 1)
            }
        } catch (error) {
            this.logError(error.message)
            domConf.error.toast('toast-submit-error')
            domConf.onSubmitDone()
        }
    }

    /**
     * Do stuff with new booking
     * @param {BookingResponse} res
     */
    handleNewBooking(res) {
        dom.id('cal-apple').href &&= res.events.apple.url
        dom.id('cal-ics').href &&= res.events.apple.url
        dom.id('cal-google').href &&= res.events.google
        dom.id('cal-outlook').href &&= res.events.outlook
    }

    /**
     * @typedef {Object} BookingForm
     * @property {string} duration
     * @property {string} frequency
     * @property {string} start-timestamp
     * @property {string} end-timestamp
     * @property {string} team-member
     * @property {string} team-member-name
     * @property {string} customer-id
     * @property {string} customer-address-id
     * @property {string} service-ironing
     * @property {string} service-grocery
     * @property {string} service-cooking
     * @property {string} service-cleaning
     * @property {string} extra-fridge
     * @property {string} extra-cabinets
     * @property {string} extra-oven
     * @property {string} extra-windows
     * @property {string} ironing
     * @property {string} cleaning-bathrooms
     * @property {string} cleaning-bedrooms
     */

    /**
     * @typedef {Object} BookingAPI
     * @property {string} duration
     * @property {string} frequency
     * @property {string} start_timestamp
     * @property {string} end_timestamp
     * @property {string} team_member_contract_id
     * @property {string} team_member_name
     * @property {string} customer_id
     * @property {string} customer_address_id
     * @property {BookingAPIOptions} options
     */
    /**
     * @typedef {Object} BookingAPIOptions
     * @property {boolean} service_cleaning
     * @property {boolean} service_ironing
     * @property {boolean} service_grocery
     * @property {boolean} service_cooking
     * @property {string} cleaning_bedrooms
     * @property {string} cleaning_bathrooms
     * @property {boolean} extra_windows
     * @property {boolean} extra_cabinets
     * @property {boolean} extra_fridge
     * @property {boolean} extra_oven
     * @property {string} ironing
     */

    /**
     * Create booking API object from form
     * @param {BookingForm} json
     * @returns {BookingAPI}
     */
    makeBooking(json) {
        const toBool = f => f === 'on'
        const rmUndefined = obj => {
            // eslint-disable-next-line no-param-reassign
            Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
            return obj
        }

        const booking = {
            duration: json.duration,
            frequency: json.frequency,
            start_timestamp: json['start-timestamp'],
            end_timestamp: json['end-timestamp'],
            team_member_contract_id: json['team-member'],
            team_member_name: json['team-member-name'],
            customer_id: json['customer-id'],
            customer_address_id: json['customer-address-id'],
            customer_email: this.member.email,
            options: {
                service_cleaning: toBool(json['service-cleaning']),
                service_ironing: toBool(json['service-ironing']),
                service_grocery: toBool(json['service-grocery']),
                service_cooking: toBool(json['service-cooking']),
                extra_windows: toBool(json['extra-windows']),
                extra_cabinets: toBool(json['extra-cabinets']),
                extra_fridge: toBool(json['extra-fridge']),
                extra_oven: toBool(json['extra-oven']),
                cleaning_bedrooms: json['cleaning-bedrooms'],
                cleaning_bathrooms: json['cleaning-bathrooms'],
                ironing: json.ironing?.replace('ironing-size-', '')
            }
        }

        return rmUndefined(booking)
    }

    /**
     * Log error
     * @param {*} res
     */
    logError(res, json) {
        console.log('Something went wrong...')
        console.log(`Status: ${res.status} ${res.statusText}`)

        if (json) console.log(`Response: ${JSON.stringify(json)}`)
        else console.log(`Response: ${res}`)
    }

    /**
     * Read options and create a summary
     */
    #createSummary() {
        // Selected services
        const { service, recurrence } = this.ops
        domSummary.service = service
        domSummary.recurrence = recurrence

        // Start date
        dom.id('conf-start').innerText = this.ops.start.toLocaleString('fr', {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    }

    #setTeamMember() {
        const memberConf = {
            first_name: this.ops.teamMember.firstName
        }

        const memberId = this.ops.teamMember.name
        const node = dom.id('conf-team-member')

        this.team.setMemberDetails(node, memberId, memberConf)
    }

    /**
     * Set cookie to be used in /redirect here when login/signup is done
     */
    setupBookingSession() {
        const buttons = [dom.id('btn-signup'), dom.id('btn-login')]
        buttons.forEach(b =>
            b?.addEventListener('click', () => {
                Cookies.set(SESSION_COOKIE, true, { secure: true, sameSite: 'strict' })
            })
        )
    }
}

const step = new Step()
step.init()
