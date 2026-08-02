import { serverApi } from '@/shered/api/server-api'

export function cancelBooking(code: string, lastName: string) {
  return serverApi.bookings.cancel(code, lastName)
}
