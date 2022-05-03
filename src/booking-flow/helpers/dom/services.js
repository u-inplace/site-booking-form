import dom from '../dom'

/**
 * Services
 */
class ServicesDom {
    static query(checked = false) {
        return dom.queryOptions('service-', checked)
    }

    /**
     * @returns {string[]}
     */
    static get selected() {
        return this.query(true).map(s => s.id.replace(/^.*-/, ''))
    }

    /**
     * @param {string} service
     * @returns {boolean}
     */
    static isServiceSelected(service) {
        return this.selected?.includes(service)
    }
}

const domServices = ServicesDom
export default domServices
