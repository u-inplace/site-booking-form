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

export { getMondays }
