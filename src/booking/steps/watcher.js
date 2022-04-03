/**
 * Next button watcher
 *
 * @class
 * @constructor
 * @public
 */
export default class ToggleWatcher {
    /**
     * @typedef {Object} Observed
     * @property {HTMLElement} elem
     * @property {string} event
     */

    /**
     * @type {Observed[]}
     * @public
     */
    list

    /**
     *
     * @param {HTMLElement[]} elems
     * @param {string} event
     */
    constructor(elems = [], event = 'change') {
        this.list = elems.map(e => ({
            elem: e,
            event
        }))
    }

    /**
     *
     * @param {Observed[]} entries
     */
    push(entries) {
        this.list = this.list.concat(entries)
    }
}
