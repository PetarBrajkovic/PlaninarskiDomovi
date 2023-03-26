export class Reservation {
    _id: string;
    mountainLodgeId: number;
    userId: number;
    numberOfNights: number
    numberOfGuests: number
    startDate: Date
    endDate: Date
    status: ReservationStatus
}

export enum ReservationStatus {
    'DEFAULT' = 'DEFAULT',
    'CONFIRMED' = 'CONFIRMED',
    'DENIED' = 'DENIED'
}