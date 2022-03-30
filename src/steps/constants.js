/**
 * Helper file for webflow inplace.be booking_
 */
export const STEP = {
    Services: 1,
    Ironing: 2,
    Cleaning: {
        Info: 3,
        Home: 4,
        Extras: 5,
        Supplies: 6
    },
    Duration: 7,
    Frequency: 8,
    Availability: 9,
    Contact: 10
}

export const SERVICE = {
    Cleaning: 'cleaning',
    Ironing: 'ironing',
    Cooking: 'cooking',
    Grocery: 'grocery'
}

export const EXTRA = {
    Windows: 'windows',
    Cabinets: 'cabinets',
    Fridge: 'fridge',
    Oven: 'oven'
}
