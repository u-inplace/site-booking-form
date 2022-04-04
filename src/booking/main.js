/* eslint-disable no-var */
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
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                contentType: 'application/json',
                dataType: 'json'
            },
            body: JSON.stringify(json)
        })

        if (res.status >= 300)
            document.getElementsByClassName('wf-form-fail')[0].style.display = 'block'
        else {
            document.getElementsByClassName('wf-form-Booking')[0].style.display = 'none'
            document.getElementsByClassName('wf-form-done')[0].style.display = 'block'
        }
    } catch (error) {
        document.getElementsByClassName('wf-form-fail')[0].style.display = 'block'
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
