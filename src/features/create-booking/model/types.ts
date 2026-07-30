export type PassengerFormValues = {
  firstName: string
  lastName: string
  dateOfBirth: Date | string | null
  documentNumber: string
}

export type BookingFormValues = {
  email: string
  phone: string
  passengers: PassengerFormValues[]
}
