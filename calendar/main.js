const availabilityCal = new Calendar({
    id: '#availability-cal',
    theme: 'glass',
    // border: "5px solid black",
    weekdayType: 'long-upper',
    startWeekday: 1,
    monthDisplayType: 'long',
    primaryColor: '#1ead96',
    fontFamilyHeader: 'Poppins, sans-serif',
    fontFamilyWeekdays: 'Poppins, sans-serif',
    fontFamilyBody: 'Poppins, sans-serif',
    calendarSize: 'large',
    layoutModifiers: ['month-left-align'],
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
