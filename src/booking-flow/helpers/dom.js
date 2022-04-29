// eslint-disable-next-line max-classes-per-file
class Dom {
    /**
     * Get Element by Id
     *
     * @param {string} id element id
     * @returns {Element}
     */
    static id(id) {
        return document.getElementById(id)
    }

    /**
     * Query selector
     *
     * @param {string} query Dom query string
     * @returns {Element}
     */
    static q(query) {
        return document.querySelector(query)
    }

    /**
     * Query selector all
     *
     * @param {string} query Dom query string
     * @returns {NodeList}
     */
    static qall(query) {
        return document.querySelectorAll(query)
    }

    /**
     * Message popup
     * @param {string} id
     * @returns {Promise}
     */
    static toast(id) {
        const toastBlock = Dom.id(id)
        toastBlock.classList.add('active')

        return setTimeout(() => {
            toastBlock.classList.remove('active')
        }, 1000 * 4)
    }

    static set nextButtonDisabled(isDisabled) {
        const nextButton = document.querySelector('.next-button-flow')
        if (!nextButton) return
        nextButton.disabled = isDisabled
        if (isDisabled) nextButton.classList.add('disabled')
        else nextButton.classList.remove('disabled')
    }

    /**
     * Helpers
     */
    static queryOptions(id, checked = false) {
        return Array.from(
            document.querySelectorAll(`input[id*='${id}']${checked ? ':checked' : ''}`)
        )
    }

    static getRadio(name, checked = false) {
        return this.q(`input[name*="${name}"]${checked ? ':checked' : ''}`)
    }

    static queryRadio(name, checked = false) {
        return Array.from(this.qall(`input[name*='${name}']${checked ? ':checked' : ''}`))
    }

    static getOption(id, checked = false) {
        return this.q(`input[id*='${id}']${checked ? ':checked' : ''}`)
    }

    /**
     * STEPS
     */
    static steps = class {
        /**
         * Services
         */
        static services = class {
            static query(checked = false) {
                return Dom.queryOptions('service-', checked)
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
                return this.selected.includes(service)
            }
        }

        /**
         * Ironing
         */
        static ironing = class {
            static get selected() {
                return Dom.getRadio('ironing-size', true)?.value?.replace(/^ironing-size-/, '')
            }
        }

        /**
         * Availability
         */
        static avail = class {
            static openings = class {
                static cleanUp() {
                    Dom.id('start-time-block')
                        ?.querySelectorAll('.start-time')
                        ?.forEach(e => e.parentNode.removeChild(e))
                }

                static showWarning() {
                    Dom.id('aval-warning').classList.add('msg-active')
                }

                static hideWarning() {
                    Dom.id('aval-warning').classList.remove('msg-active')
                }
            }

            static team = class {
                static showBlock() {
                    Dom.id('team-members-block').classList.add('visible')
                }

                static hideBlock() {
                    Dom.id('team-members-block').classList.remove('visible')
                }

                static cleanUp() {
                    Dom.id('team-members-block')
                        ?.querySelectorAll('.team-member')
                        ?.forEach(e => e.parentNode.removeChild(e))
                }

                static get memberTemplate() {
                    return Dom.id('team-member-template')
                }
            }

            static teamMember = class {
                static get name() {
                    return Dom.id('team-member-name').value
                }

                static set name(name) {
                    Dom.id('team-member-name').value = name
                }

                static get firstName() {
                    return Dom.id('team-member-first-name').value
                }

                static set firstName(first) {
                    Dom.id('team-member-first-name').value = first
                }

                static get avatar() {
                    return Dom.id('team-members-block').querySelector('img').src
                }
            }
        }
    }

    /** *
     * Summary
     */
    static summary = class {
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
            const { classList } = Dom.id(`summary-${s}`)
            if (display) classList.add('service-active')
            else classList.remove('service-active')
        }

        /**
         * Display recurrence
         * @param {('weekly'|'biweekly'|'once')} r
         */
        static set recurrence(r) {
            Dom.id(`summary-${r}`).classList.remove('hidden')
        }
    }
}

const dom = Dom

export default dom
