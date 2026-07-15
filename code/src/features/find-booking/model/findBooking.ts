import { getBookingByCode } from '@/entities/booking/api/getBookingByCode'
import { ApiError } from '@/shered/api/api-error'
import type { FindBookingValues } from './types'

export async function findBooking(values: FindBookingValues) {
  try {
    return { booking: await getBookingByCode(values.bookingCode.trim(), values.lastName.trim()), error: null }
  }
  catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { booking: null, error: 'Бронь с таким кодом и фамилией не найдена.' }
    }

    return { booking: null, error: 'Не удалось найти бронь. Попробуйте ещё раз.' }
  }
}
