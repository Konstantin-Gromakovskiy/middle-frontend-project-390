export interface City {
  code: string
  name: string
  country?: string
}

export interface Money {
  amount: number
  currency: string
}

export interface Airline {
  code: string
  name: string
}

export interface Flight {
  id: string
  flightNumber: string
  airline: Airline
  origin: City
  destination: City
  departureAt: string
  arrivalAt: string
  durationMinutes: number
  price: Money
  seatsAvailable: number
}

export interface Contact {
  email: string
  phone: string
}

export interface Passenger {
  firstName: string
  lastName: string
  dateOfBirth: string
  documentNumber: string
}

export type BookingStatus = 'confirmed' | 'cancelled'

export interface CreateBookingRequest {
  flightId: string
  contact: Contact
  passengers: Passenger[]
}

export interface Booking {
  code: string
  status: BookingStatus
  flight: Flight
  passengers: Passenger[]
  contact: Contact
  totalPrice: Money
  createdAt: string
}

export interface SearchFlightsParams {
  origin: string
  destination: string
  date: string
  passengers?: number
}

export interface ApiErrorResponse {
  code?: string
  message?: string
}
