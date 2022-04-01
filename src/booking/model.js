/**
 * Booking model
 */
export default class BookingModel {
    steps
    #instance

    constructor(steps) {
        this.steps = steps
    }

    static get instance() {
        this.#instance ??= new BookingModel()
        return this.#instance
    }

    get estimation() {
        return Math.floor(
            Object.values(this.steps).reduce((acc, s, i) => {
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
        BookingModel.estimation = this.estimation
    }

    static get coverage() {
        return [
            '1070',
            '1160',
            '1082',
            '1000',
            '1040',
            '1140',
            '1190',
            '1083',
            '1130',
            '1050',
            '1090',
            '1081',
            '1020',
            '1080',
            '1120',
            '1060',
            '1210',
            '1030',
            '1180',
            '1170',
            '1200',
            '1150'
        ]
    }
}
