/**
 * Next button watcher
 */
export default class ToggleWatcher {
    #list

    constructor(elems = [], event = 'change') {
        this.#list = elems.map(e => ({
            elem: e,
            event
        }))
    }

    push(entries) {
        this.#list = this.#list.concat(entries)
    }

    get list() {
        return this.#list
    }
}
