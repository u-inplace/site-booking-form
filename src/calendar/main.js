import Calendar from 'color-calendar'
import 'color-calendar/dist/css/theme-glass.css'
import { getMondays } from '../helpers/dates'

export class Controller {
    constructor() {
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
            eventsData: [
                {
                    id: 1,
                    name: 'French class',
                    start: '2022-03-17T06:00:00',
                    end: '2022-03-18T20:30:00'
                },
                {
                    id: 2,
                    name: 'Blockchain 101',
                    start: '2022-03-20T10:00:00',
                    end: '2022-03-20T11:30:00'
                },
                {
                    id: 3,
                    name: 'Cheese 101',
                    start: '2022-04-01T10:00:00',
                    end: '2022-04-02T11:30:00'
                },
                {
                    id: 4,
                    name: 'Cheese 101',
                    start: '2022-04-01T10:00:00',
                    end: '2022-04-02T11:30:00'
                }
            ],
            dateChanged: (currentDate, events) => {
                console.debug('date change', currentDate, events)
            },
            monthChanged: (currentDate, events) => {
                console.debug('month change', currentDate, events)
            }
        })
    }

    init() {
        this.getAvailability()
        console.log(JSON.stringify(getMondays(), null, 2))
    }

    /**
     * Get Availability
     */
    async getAvailability() {
        const url = new URL('https://inplace-booking.azurewebsites.net/api/availability')
        const params = new URLSearchParams({
            code: 'jDlOk9eyca7HVUuVn2fRaIDQmv57z9l8bCHssUSMzpDugndIrzi5Tw==',
            postalCode: 1000,
            duration: 3,
            recurrence: 'once',
            weekSearchDate: '2022-04-11'
        })

        url.search = params
        const res = await fetch(url)
        const avail = await res.json()

        console.log(JSON.stringify(avail, null, 2))

        avail?.data?.forEach(dateAvail =>
            dateAvail.time_slots.forEach(slot => {
                const event = {
                    start: slot.start_time,
                    end: slot.end_time,
                    start_time: slot.label,
                    employee: {
                        id: slot.affiliate_worker.worker_contract_id,
                        first_name: slot.affiliate_worker.first_name,
                        last_name: slot.affiliate_worker.last_name,
                        allergies: slot.affiliate_worker.allergies
                    }
                }
                this.calendar.addEventsData([event])
            })
        )
    }
}
