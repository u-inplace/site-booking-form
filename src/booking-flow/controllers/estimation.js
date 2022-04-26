import BookingOptions from './options'

export default class Estimation {
    /**
     * @type {BookingOptions}
     */
    ops

    /**
     *
     * @param {CookieOptions} options
     */
    constructor() {
        this.ops = new BookingOptions()
    }

    get total() {
        return 3 + this.services + this.ironing + this.cleaning
    }

    get services() {
        const { services } = this.ops
        let total = 0
        if (services.length > 1) {
            total += this.ops.service.cooking ? 0.5 : 0
            total += this.ops.service.grocery ? 0.5 : 0
        }
        return total
    }

    get ironing() {
        if (!this.ops.service.ironing) return 0

        switch (this.ops.ironing) {
            case 'xs':
                return 0.5
            case 's':
                return 1
            case 'm':
                return 2
            case 'l':
                return 3
            case 'xl':
                return 4
            default:
                return 0
        }
    }

    get cleaning() {
        if (!this.ops.service.cleaning) return 0

        // Extras
        const { extra } = this.ops
        let total = extra.windows ? 1 : 0
        total += extra.cabinets ? 1 : 0
        total += extra.fridge ? 0.5 : 0
        total += extra.oven ? 0.5 : 0

        // Bedroom
        const bedroom = this.ops.cleaning.bedrooms
        const bathroom = this.ops.cleaning.bathrooms
        switch (bedroom) {
            case '3':
            case '4':
                total += 1
                break
            case '5+':
                total += 2
                break
            default:
                break
        }

        switch (bathroom) {
            case '2':
                total += 1
                break
            case '3':
                total += 2
                break
            case '4+':
                total += 3
                break
            default:
                break
        }
        return total
    }
}
