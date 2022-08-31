/**
 * @typedef {Object} Member
 * @property {string} id
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
 */
/**
 * @typedef {Object} MemberStack
 * @property {string} id
 * @property {Auth} auth
 * @property {CustomFields} customFields
 * @property {MetaData} metaData
 * @property {string} permissions
 * @property {PlanConnections[]} planConnections
 */
/**
 * @typedef {Object} Auth
 * @property {string} email
 */
/**
 * @typedef {Object} MetaData
 * @property {string} avatar
 */
/**
 * @typedef {Object} PlanConnections
 * @property {string} id
 * @property {string} status
 * @property {string} planId
 * @property {string} type
 * @property {object} payment
 */
/**
 * @typedef {Object} CustomFields
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

/** @type {MemberStack} */
const MemberStackType = {}

/** @type {Member} */
const MemberType = {}

export { MemberType, MemberStackType }
