export const events = [
    {
        id: '1',
        start: new Date('2024-03-22 19:00:00'),
        end: new Date('2024-03-22 21:00:00'),
        title: 'Cumpleaños de Héctor',
        notes: 'Alguna nota',
    },
    {
        id: '2',
        start: new Date('2024-03-29 13:00:00'),
        end: new Date('2024-03-29 15:00:00'),
        title: 'Cumpleaños de Valeria',
        notes: 'Alguna nota de Valeria',
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] },
}