import { serverApi } from '@/shered/api/server-api'

export function getBookingByCode(code: string, lastName: string) {
  return serverApi.bookings.getByCode(code, lastName)
}
