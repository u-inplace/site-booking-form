/* eslint-disable no-var */
import smoothscroll from 'smoothscroll-polyfill'
import '../vivify.css'
import DOM from './dom'
import Navigation from './navigation'
import './style.css'

/**
 * Log error
 * @param {*} res
 */
const logError = async res => {
    console.log('Something went wrong...')
    console.log(`Status: ${res.status} ${res.statusText}`)

    if (res?.body) console.log(`Response: ${await res?.body}`)
    else console.log(`Response: ${res}`)
}

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
            logError(res)

            if (resJson?.errors?.sodexo_reference) DOM.form.error.toast('toast-sodexo')
            else DOM.form.error.toast('toast-submit-error')

            DOM.form.onSubmitDone()
        } else {
            DOM.form.done()
        }
    } catch (error) {
        logError(error.message)
        DOM.form.error.toast('toast-submit-error')
        DOM.form.onSubmitDone()
    }
}

/**
 * Add handlers
 */
const sliderController = () => {
    // kick off the polyfill!
    smoothscroll.polyfill()

    //  ONly starts after page is loaded
    const navController = new Navigation()
    navController.init()

    // Setup form submit action
    document.getElementById('wf-form-Booking').onsubmit = onSubmit
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
