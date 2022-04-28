/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */

import BookingOptions from '../controllers/options'
import { STEP } from '../controllers/sequence'
import StepController from '../controllers/step'
import Team from '../fragments/teamMember'
import dom from '../helpers/dom'

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
        dom.id('conf-start').innerText = this.ops.start.toLocaleString()
    }

    #setTeamMember() {
        const memberConf = {
            first_name: this.ops.teamMember.firstName
        }

        const memberId = this.ops.teamMember.name
        const node = dom.id('conf-team-member')

        this.team.setMemberDetails(node, memberId, memberConf)

        // show node once details have been set
        node.classList.remove('hidden')
    }
}

var Webflow = Webflow || window.Webflow || []
Webflow.push(() => {
    const step = new Step()
    step.init()
})
