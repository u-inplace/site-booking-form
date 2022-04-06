/* eslint-disable no-var */
import smoothscroll from 'smoothscroll-polyfill'
import '../vivify.css'
import Form from './form'
import Navigation from './navigation'
import './style.css'

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
    document.getElementById('wf-form-Booking').onsubmit = Form.onSubmit.bind(this)
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
