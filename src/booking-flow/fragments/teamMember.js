/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class Team {
    /**
     * Team Members
     * @typedef {{fileId: string, url: string }} Image
     * @typedef {Object} TeamMember
     * @property {string} name
     * @property {string} slug
     * @property {string} email
     * @property {boolean} english
     * @property {boolean} french
     * @property {boolean} dutch
     * @property {Image} profile-picture
     */
    /**
     * @type {TeamMember[]}
     * @protected
     */
    _members

    /**
     * @type {Promise}
     * @protected
     */
    #teamReq

    constructor() {
        // Get all team members from Webflow CMS
        this.#teamReq = this.#fetchTeam()
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
        const members = await res.json()

        this._members = members
    }

    get members() {
        // Is possible that #fetchTeam hasn't replied yet with members
        return (async () => {
            await this.#teamReq
            return this._members
        })()
    }

    /**
     * @typedef {Object} MemberIDConf
     * @property {string} first_name
     * @property {string} last_name
     *
     * @typedef {string} MemberId Member Id
     *
     * @param {MemberIDConf} conf
     * @return {MemberId}
     */
    makeMemberId(conf) {
        return `${conf.first_name} ${conf.last_name}`
    }

    /**
     * Set details of an member element
     *
     * @typedef {Object} MemberConf
     * @property {string} first_name
     * @property {string} last_name
     *
     * @param {HTMLElement} node
     * @param {MemberId} memberId
     * @param {MemberConf} conf Hard confs for members not in Webflow
     */
    setMemberDetails(node, memberId, conf) {
        // Get profile picture from webflow collections
        const member = this.members.find(m => m.name === memberId)

        if (member) {
            const avatar = member?.['profile-picture']

            if (avatar?.url) node.querySelector('.team-avatar').src = avatar.url

            // Languages
            if (member.french) node.querySelector('.french').classList.remove('hidden')
            if (member.dutch) node.querySelector('.dutch').classList.remove('hidden')
            if (member.english) node.querySelector('.english').classList.remove('hidden')
        }

        // Set Name from conf
        const label = node.querySelector('team-member-name')
        label.innerText = conf.first_name

        // Save team member name in attribute
        // In summary this input wont exits
        const nodeInput = node.querySelector('input')
        if (nodeInput) {
            nodeInput.setAttribute('member-name', `${conf.first_name} ${conf.last_name}`)
            nodeInput.setAttribute('member-first-name', `${conf.first_name}`)
        }
    }
}
