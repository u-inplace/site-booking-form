import dom from '../dom'

/**
 * Summary
 */
class SummaryDom {
    /**
     * @typedef {import('../controllers/options').Service} ServiceOptions
     * @param {ServiceOptions} service
     */
    static set service(service) {
        Object.entries(service).forEach(([s, isActive]) => this.displayService(s, isActive))
    }

    /**
     * Show or hide service
     * @param {import('../controllers/options').Services} s
     * @param {boolean} display
     */
    static displayService(s, display = true) {
        const { classList } = dom.id(`summary-${s}`)
        if (display) classList?.add('service-active')
        else classList?.remove('service-active')
    }

    /**
     * Display recurrence
     * @param {('weekly'|'biweekly'|'once')} r
     */
    static set recurrence(r) {
        dom.id(`summary-${r}`)?.classList.remove('hidden')
    }
}

const domSummary = SummaryDom
export default domSummary
