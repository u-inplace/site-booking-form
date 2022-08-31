export default class MemberStack {
    /**
     * @returns {import('../types/memberstack').MemberStack}
     */
    async getMemberStack() {
        const memberStack = window.$memberstackDom
        const msmember = await memberStack.getCurrentMember()
        return msmember.data
    }

    /**
     * @returns {import('../types/memberstack').Member}
     */
    async getMember() {
        const msmember = await this.getMemberStack()
        const member = msmember.customFields
        member.email = msmember.auth.email
        member.id = msmember.id
        return member
    }
}
