'use server'

import dayjs from 'dayjs'
import { createBooking } from '@/entities/booking/api/createBooking'
import { ApiError } from '@/shered/api/api-error'
import type { BookingFormValues } from './types'

type CreateBookingActionResult = {
  success: boolean
  bookingCode?: string
  error?: string
}

export async function createBookingAction(flightId: string, values: BookingFormValues): Promise<CreateBookingActionResult> {
  try {
    const booking = await createBooking({
      flightId,
      contact: {
        email: values.email,
        phone: values.phone,
      },
      passengers: values.passengers.map(passenger => ({
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        dateOfBirth: passenger.dateOfBirth ? dayjs(passenger.dateOfBirth).format('YYYY-MM-DD') : '',
        documentNumber: `${passenger.documentSeries.trim()} ${passenger.documentNumber.trim()}`,
      })),
    })

    return { success: true, bookingCode: booking.code }
  }
  catch (error) {
    if (error instanceof ApiError) return { success: false, error: error.message }

    return { success: false, error: 'Не удалось создать бронирование. Попробуйте ещё раз.' }
  }
}
