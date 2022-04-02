/* eslint-disable no-var */
import Navigation from './navigation'
import './style.css'

/**
 * Add handlers
 */
const sliderController = () => {
    //  ONly starts after page is loaded
    setTimeout(() => {
        const navController = new Navigation()
        navController.init()
    }, 1000 * 3)
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
