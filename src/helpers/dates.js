import * as iso8601 from 'iso8601-support'

/**
 * Return all mondays of the month
 * @param {*} date
 * @returns
 */
const getMondays = date => {
    const d = date ? new Date(date.getTime()) : new Date()
    const month = d.getMonth()
    const mondays = []

    d.setDate(1)

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()))
        d.setDate(d.getDate() + 7)
    }

    return mondays
}

/**
 * Return YYYY-MM-DD
 */
export const toISOStringShort = date => new Date(date).toISOString().slice(0, 10)

export const toISOStringWithOffset = date => {
    // 2022-09-07T14:30:00.000+02:00
    const almost = iso8601.toISOStringWithOffset(date)

    // 2022-04-07T00:00:00+02:00
    const isoWithOffset = almost.replace('.000', '')

    return isoWithOffset
}

export { getMondays }
