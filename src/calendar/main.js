import Calendar from 'color-calendar'
import 'color-calendar/dist/css/theme-glass.css'
import _ from 'lodash'
import { getMondays, toISOStringShort } from '../helpers/dates'

export class Controller {
    constructor() {
        // Store requested weeks
        this.cached = {}

        const newLocal = this
        newLocal.calendar = new Calendar({
            id: '#availability-cal',
            theme: 'glass',
            // border: "5px solid black",
            weekdayType: 'long-upper',
            startWeekday: 1,
            monthDisplayType: 'long',
            primaryColor: '#2aae75',
            fontFamilyHeader: 'Poppins, sans-serif',
            fontFamilyWeekdays: 'Poppins, sans-serif',
            fontFamilyBody: 'Poppins, sans-serif',
            calendarSize: 'large',
            layoutModifiers: ['month-left-align'],
            dropShadow: '',
            dateChanged: (currentDate, events) => {
                console.debug('date change', currentDate, events)
            },
            monthChanged: (currentDate, events) => {
                console.debug('month change', currentDate, events)
                getMondays(currentDate).forEach(monday => this.getAvailability(monday))
            }
        })
    }

    init() {
        // Boostrap with current month's availability
        getMondays().forEach(monday => this.getAvailability(monday))
    }

    /**
     * Get Availability
     */
    async getAvailability(weekStartDate) {
        const weekKey = toISOStringShort(weekStartDate)

        if (weekStartDate < new Date() || this.cached[weekKey]) return
        this.cached[weekKey] = true

        console.log(`# WeekStart: ${toISOStringShort(weekStartDate)}`)

        const url = new URL('https://inplace-booking.azurewebsites.net/api/availability')
        const params = new URLSearchParams({
            code: 'jDlOk9eyca7HVUuVn2fRaIDQmv57z9l8bCHssUSMzpDugndIrzi5Tw==',
            postalCode: 1000,
            duration: 3,
            recurrence: 'once',
            weekSearchDate: toISOStringShort(weekStartDate)
        })

        url.search = params
        const res = await fetch(url)
        const avail = await res.json()

        console.log(JSON.stringify(avail, null, 2))

        const newEvents = _.compact(
            avail?.data
                ?.map(dateAvail =>
                    dateAvail.time_slots.map(slot => {
                        // Only add if it's still the same month as start of the week
                        // to avoid infinity loop with monthChanged event, which is triggered
                        // when a new event is added
                        if (new Date(slot.start_time).getMonth() !== weekStartDate.getMonth())
                            return

                        return {
                            start: new Date(slot.start_time),
                            end: new Date(slot.end_time),
                            start_time: slot.label,
                            employee: {
                                id: slot.affiliate_worker.worker_contract_id,
                                first_name: slot.affiliate_worker.first_name,
                                last_name: slot.affiliate_worker.last_name,
                                allergies: slot.affiliate_worker.allergies
                            }
                        }
                    })
                )
                .flat()
        )

        console.log(`>> ${toISOStringShort(weekStartDate)} + ${newEvents.length} slots`)
        console.log(`${JSON.stringify(newEvents, null, 2)}`)
        newEvents.length > 0 && this.calendar.addEventsData(newEvents)
    }
}
