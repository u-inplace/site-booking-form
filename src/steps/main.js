/* eslint-disable no-var */
import Navigation from './navigation'

/**
 * Add handlers
 */
const sliderController = () => {
    // eslint-disable-next-line no-new
    new Navigation()
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
