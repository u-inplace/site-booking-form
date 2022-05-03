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

const SESSION_COOKIE = '__inplace_booking_session'

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
        super(STEP.Confirmation)
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
     * Create form submit handlers
     */
    #setupSubmit() {
        dom.id('booking-form').addEventListener('submit', this.onSubmit.bind(this))
    }

    /**
     * Form Submission
     * @param {SubmitEvent} event
     */
    async onSubmit(event) {
        event.preventDefault()
        const { form } = event.target
        const data = new FormData(form)
        const json = Object.fromEntries(data.entries())

        const url = new URL(form.attributes.action.value)

        try {
            domConf.onSubmit()

            const resRaw = await fetch(url, {
                method: 'POST',
                headers: {
                    contentType: 'application/json',
                    dataType: 'json'
                },
                body: JSON.stringify(json)
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
        dom.summary.service = service
        dom.summary.recurrence = recurrence

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
