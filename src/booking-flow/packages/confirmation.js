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
            b.addEventListener('click', () => {
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
