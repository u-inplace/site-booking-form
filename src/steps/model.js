/**
 * Booking model
 */
export default class BookingModel {
    #steps

    constructor(steps) {
        this.#steps = steps
    }

    /**
     * Estimation calc
     */
    get estimation() {
        return Math.floor(
            Object.values(this.#steps).reduce((acc, s, i) => {
                console.log(`Estimation Step ${i + 1}: ${s ? s?.duration : 0}`)
                // eslint-disable-next-line no-param-reassign
                acc += s ? s.duration : 0
                return acc
            }, 3.0)
        )
    }

    static set estimation(estimation) {
        document.getElementById('duration').nextElementSibling.noUiSlider.set(estimation)
    }

    updateEstimation() {
        this.estimation = this.estimation
    }
}
