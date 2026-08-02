import { cancelBooking } from '@/entities/booking/api/cancelBooking'
import { ApiError } from '@/shered/api/api-error'

type CancelBookingActionResult = {
  booking: Awaited<ReturnType<typeof cancelBooking>>
  error: null
} | {
  booking: null
  error: string
}

export async function cancelBookingAction(code: string, lastName: string): Promise<CancelBookingActionResult> {
  try {
    return { booking: await cancelBooking(code, lastName), error: null }
  }
  catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { booking: null, error: 'Не удалось отменить бронь. Проверьте данные бронирования.' }
    }

    if (error instanceof ApiError) return { booking: null, error: error.message }

    return { booking: null, error: 'Не удалось отменить бронь. Попробуйте ещё раз.' }
  }
}
