class Dom {
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
        const toastBlock = document.getElementById(id)
        toastBlock.classList.add('active')

        return setTimeout(() => {
            toastBlock.classList.remove('active')
        }, 1000 * 4)
    }
}

const dom = Dom

export default dom
