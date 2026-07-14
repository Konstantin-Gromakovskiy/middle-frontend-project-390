export type PassengerFormValues = {
  firstName: string
  lastName: string
  dateOfBirth: Date | string | null
  documentSeries: string
  documentNumber: string
}

export type BookingFormValues = {
  email: string
  phone: string
  passengers: PassengerFormValues[]
}
