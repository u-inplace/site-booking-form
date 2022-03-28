/**
 * Return all mondays of the month
 * @param {*} date
 * @returns
 */
const getMondays = date => {
    var d = date || new Date(),
        month = d.getMonth(),
        mondays = []

    d.setDate(1)

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()))
        d.setDate(d.getDate() + 7)
    }

    return mondays
}

export { getMondays }
