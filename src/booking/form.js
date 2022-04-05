import { SERVICE } from './constants'
import DOM from './dom'

export default class Form {
    /**
     * Log error
     * @param {*} res
     */
    static async logError(res) {
        console.log('Something went wrong...')
        console.log(`Status: ${res.status} ${res.statusText}`)

        if (res?.body) console.log(`Response: ${await res?.body}`)
        else console.log(`Response: ${res}`)
    }

    /**
     * Read options and create a summary
     */
    static createSummary() {
        // Selected services
        const services = DOM.getSelectedServices()
        Object.values(SERVICE).forEach(s =>
            services.includes(s)
                ? DOM.form.summary.activeService(s)
                : DOM.form.summary.inactiveService(s)
        )

        const { duration } = DOM
        DOM.form.summary.duration = `${duration}h`
        DOM.form.summary.payment = `${duration} titres-services`

        const startIso = document.getElementById('start-timestamp').value

        const { occurrence } = DOM
        DOM.form.summary.occurrence = occurrence

        // Team member
        DOM.form.summary.team = DOM.teamMember
    }

    /**
     * Form Submission
     * @param {SubmitEvent} event
     */
    static async onSubmit(event) {
        event.preventDefault()
        const form = event.target
        const data = new FormData(form)
        const json = Object.fromEntries(data.entries())

        const url = new URL(form.attributes.action.value)

        try {
            DOM.form.onSubmit()

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    contentType: 'application/json',
                    dataType: 'json'
                },
                body: JSON.stringify(json)
            })

            const resJson = await res.json()

            if (res.status >= 300) {
                Form.logError(res)

                if (resJson?.errors?.sodexo_reference) DOM.form.error.toast('toast-sodexo')
                else DOM.form.error.toast('toast-submit-error')

                DOM.form.onSubmitDone()
            } else {
                Form.createSummary()
                DOM.form.done()
            }
        } catch (error) {
            Form.logError(error.message)
            DOM.form.error.toast('toast-submit-error')
            DOM.form.onSubmitDone()
        }
    }
}
