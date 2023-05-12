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
export const toISOStringShort = date => {
    const d = date instanceof Date ? date : new Date(date)
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
    ).padStart(2, '0')}`

    return formattedDate
}

export { getMondays }
