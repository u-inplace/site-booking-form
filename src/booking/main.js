/* eslint-disable no-var */
import '../vivify.css'
import DOM from './dom'
import Navigation from './navigation'
import './style.css'

/**
 * Form Submission
 * @param {SubmitEvent} event
 */
const onSubmit = async event => {
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
            DOM.form.error.title = 'Something went wrong'
            DOM.form.error.detail = JSON.stringify(resJson)
            DOM.form.error.toast()
            DOM.form.onSubmitDone()
        } else {
            DOM.form.done()
        }
    } catch (error) {
        DOM.form.error.title = 'Something went very wrong'
        DOM.form.error.detail = error.message
        DOM.form.error.toast()
        DOM.form.onSubmitDone()
    }
}

/**
 * Add handlers
 */
const sliderController = () => {
    //  ONly starts after page is loaded
    const navController = new Navigation()
    navController.init()

    // Setup form submit action
    document.getElementById('wf-form-Booking').onsubmit = onSubmit
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
