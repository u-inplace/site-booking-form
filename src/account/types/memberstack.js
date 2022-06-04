/**
 * @typedef {Object} Member
 * @property {string} email
 * @property {string} first-name
 * @property {string} last-name
 * @property {string} street-name
 * @property {string} street-number
 * @property {string} city
 * @property {string} postal-code
 * @property {string} phone
 * @property {string} sodexo
 * @property {string} pootsy-id
 * @property {string} pootsy-address-id
 * @property {string} language
 * @property {string} id
 * @property {string} memberPage
 * @property {boolean} loggedIn
 * @property {Membership} membership
 */
/**
 * @typedef {Object} Membership
 * @property {string} id
 * @property {string} amount
 * @property {string} status
 * @property {boolean} cancel_at_period_end
 * @property {string} name
 * @property {string} signupDate
 */

/** @type {Member} */
const MemberStackType = {}
const MemberDummy = {}

export { MemberDummy, MemberStackType }
