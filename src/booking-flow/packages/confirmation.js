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

const SESSION_COOKIE = '__inplace_booking_session'
const FORM_ID = 'booking-form'

class Step extends StepController {
    /**
     * @type {BookingOptions}
     */
    ops

    /**
     * @type {Team}
     */
    team

    constructor() {
        super(STEP.Confirmation, FORM_ID)
        this.ops = new BookingOptions()
        this.team = new Team()
    }

    init() {
        super.init()
        this.#createSummary()
        this.#setTeamMember()
        this.setupBookingSession()
        this.#setupSubmit()
    }

    /**
     * No need to set input handlers for next button, since this is the
     * last step.
     * the input.checked = false fix is also messing with FpCookies unloading
     */
    setupInputHandlers() {}

    /**
     * Create form submit handlers
     */
    #setupSubmit() {
        dom.id(FORM_ID).addEventListener('submit', this.onSubmit.bind(this))
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
     * Form Submission
     * @param {SubmitEvent} event
     */
    async onSubmit(event) {
        event.preventDefault()
        const { form } = event.target
        const data = new FormData(form)

        /** @type {BookingForm} */
        const json = Object.fromEntries(data.entries())

        /** @type {BookingAPI} */
        const booking = {
            duration: json.duration,
            frequency: json.frequency,
            start_timestamp: json['start-timestamp'],
            end_timestamp: json['end-timestamp'],
            team_member_contract_id: json['team-member'],
            team_member_name: json['team-member-name'],
            customer_id: json['customer-id'],
            customer_address_id: json['customer-address-id'],
            options: {
                service_cleaning: json['service-cleaning'],
                service_ironing: json['service-ironing'],
                service_grocery: json['service-grocery'],
                service_cooking: json['service-cooking'],
                cleaning_bedrooms: json['cleaning-bedrooms'],
                cleaning_bathrooms: json['cleaning-bathrooms'],
                extra_windows: json['extra-windows'],
                extra_cabinets: json['extra-cabinets'],
                extra_fridge: json['extra-fridge'],
                extra_oven: json['extra-oven'],
                ironing: json.ironing.replace('ironing-size-', '')
            }
        }

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

            const res = await resRaw.json()

            if (resRaw.status >= 300) {
                this.logError(resRaw, res)

                if (res?.errors?.sodexo_reference) domConf.error.toast('toast-sodexo')
                else if (res?.error === 'UNAVAILABLE_TIME_SLOT')
                    domConf.error.toast('toast-unavailable-slot')
                else if (res?.errors?.[0].includes('sodexo number is already linked '))
                    domConf.error.toast('toast-sodexo-duplicated')
                else domConf.error.toast('toast-submit-error')

                domConf.onSubmitDone()
            } else {
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
     * Log error
     * @param {*} res
     */
    static async logError(res, json) {
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

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new Step()
    step.init()
})
