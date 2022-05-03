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
}

const dom = Dom

export default dom
