/**
 * @typedef {{cleaning:boolean, cooking:boolean, grocery:boolean, ironing:boolean}} Service
 * @typedef {('cleaning'|'cooking'|'grocery'|'ironing')[]} Services
 */

/**
 * Helpers
 */

/**
 * Removes prefix from string
 * @param {string} s input String
 * @param {string} p prefix to be removed
 * @returns {string} string without prefix
 */
const rmPrefix = (s, p) => s.replace(new RegExp(`^${p}`), '')

/**
 * Booking Options
 * @class
 * @constructor
 * @public
 */
export default class BookingOptions {
    cookie

    /**
     * @typedef {Object} SessionOptions
     * @property {string} cleaning-bathrooms
     * @property {string} cleaning-bedrooms
     * @property {boolean} extra-cabinets
     * @property {boolean} extra-fridge
     * @property {boolean} extra-oven
     * @property {boolean} extra-windows
     * @property {string} ironing
     * @property {string} postal-code
     * @property {boolean} service-cleaning
     * @property {boolean} service-cooking
     * @property {boolean} service-grocery
     * @property {boolean} service-ironing
     * @property {number} duration
     * @property {string} frequency
     * @property {string} start-timestamp
     * @property {string} end-timestamp
     * @property {string} team-member
     * @property {string} team-member-name
     * @property {string} team-member-first-name
     */
    /**
     * @type {SessionOptions}
     */
    ops

    constructor() {
        this.cookie = window.FpCookie
        this.ops = this.cookie.store
    }

    /**
     * Remove all options, cleaning cookie store
     */
    clear() {
        this.cookie.clear()
    }

    /**
     * Check if options are valid
     */
    get isValid() {
        return Object.keys(this.ops).length > 0
    }

    /**
     * @param {string} prefix
     * @returns {object}
     */
    #getOptionWithPrefix(prefix) {
        return (
            Object.entries(this.ops)
                // eslint-disable-next-line no-unused-vars
                .filter(([key, _]) => key.startsWith(prefix))
                .reduce((acc, [key, value]) => {
                    acc[rmPrefix(key, prefix)] = value
                    return acc
                }, {})
        )
    }

    /**
     * @param {string} prefix
     * @param {(any|undefined)} [filter=undefined]
     * @returns {any[]}
     */
    #filterOptionWithPrefix(prefix, filter = undefined) {
        return (
            Object.entries(this.ops)
                .filter(
                    ([key, value]) =>
                        key.startsWith(prefix) && (filter === undefined || value === filter)
                )
                // eslint-disable-next-line no-unused-vars
                .map(([key, _]) => rmPrefix(key, prefix))
        )
    }

    /**
     * @returns {{bathrooms:string, bedrooms:string}}
     */
    get cleaning() {
        return this.ops['service-cleaning'] ? this.#getOptionWithPrefix('cleaning-') : {}
    }

    /**
     * @returns {('cabinets' | 'fridge' | 'oven' | 'windows')[]}
     */
    get extras() {
        return this.ops['service-cleaning'] ? this.#filterOptionWithPrefix('extra-', true) : []
    }

    /**
     * @returns {{cabinets:boolean, fridge:boolean, oven:boolean, windows:boolean}}
     */
    get extra() {
        return this.ops['service-cleaning'] ? this.#getOptionWithPrefix('extra-') : {}
    }

    /**
     * @returns {('xs'|'s'|'m'|'l'|'xl'|'')}
     */
    get ironing() {
        return this.ops['service-ironing'] ? this.ops.ironing.replace('ironing-size-', '') : ''
    }

    /**
     * @returns {number}
     */
    get postalCode() {
        return this.ops['postal-code']
    }

    /**
     * @returns {Services}
     */
    get services() {
        return this.#filterOptionWithPrefix('service-', true)
    }

    /**
     * @returns {Service}
     */
    get service() {
        return this.#getOptionWithPrefix('service-')
    }

    /**
     * @returns {number}
     */
    get duration() {
        return this.ops?.duration
    }

    /**
     * @returns {('weekly'|'biweekly'|'once')}
     */
    get recurrence() {
        return this.ops?.frequency
    }

    /**
     * @returns {Date}
     */
    get start() {
        return new Date(this.ops['start-timestamp'])
    }

    /**
     * @returns {Date}
     */
    get end() {
        return new Date(this.ops['end-timestamp'])
    }

    /**
     * @typedef {Object} TeamMember
     * @property {string} id
     * @property {string} name
     * @property {string} firstName
     *
     * @returns {TeamMember}
     */
    get teamMember() {
        return {
            id: this.ops['team-member'],
            name: this.ops['team-member-name'],
            firstName: this.ops['team-member-first-name']
        }
    }
}
