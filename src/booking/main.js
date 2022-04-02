/* eslint-disable no-var */
import DOM from './dom'
import Navigation from './navigation'
import './style.css'

/**
 * Add handlers
 */
const sliderController = () => {
    // eslint-disable-next-line no-new
    const navController = new Navigation()
    navController.init()

    // Line below is here just to load this thing in the main file
    // eslint-disable-next-line no-unused-expressions
    DOM.slider
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
