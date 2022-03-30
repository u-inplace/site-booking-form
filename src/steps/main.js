/* eslint-disable no-var */
import Navigation from './navigation'

/**
 * Add handlers
 */
const sliderController = () => {
    const nav = new Navigation()

    const domSlider = document.getElementById('booking-slider')
    domSlider.querySelector('.next-button-slide').addEventListener('click', nav.onNext.bind(nav))
    domSlider.querySelector('.back-button-slide').addEventListener('click', nav.onBack.bind(nav))
}

// eslint-disable-next-line no-use-before-define
var Webflow = Webflow || window.Webflow || []
Webflow.push(sliderController)
