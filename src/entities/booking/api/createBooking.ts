import { serverApi } from '@/shered/api/server-api'
import type { CreateBookingRequest } from '@/shered/api/server-api.types'

export function createBooking(request: CreateBookingRequest) {
  return serverApi.bookings.create(request)
}
