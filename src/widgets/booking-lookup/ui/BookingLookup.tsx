'use client'

import { Alert, Loader, Paper, Stack, Text, Title } from '@mantine/core'
import { useState, useTransition } from 'react'
import { BookingDetails } from '@/entities/booking/ui/BookingDetails'
import { cancelBookingAction } from '@/features/cancel-booking/model/cancelBookingAction'
import { findBooking } from '@/features/find-booking/model/findBooking'
import { FindBookingForm } from '@/features/find-booking/ui/FindBookingForm'
import type { FindBookingValues } from '@/features/find-booking/model/types'
import type { Booking } from '@/shered/api/server-api.types'

export function BookingLookup() {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isNotFound, setIsNotFound] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [lastName, setLastName] = useState<string | null>(null)
  const [cancelError, setCancelError] = useState<string | null>(null)
  const [isCancelling, startCancelTransition] = useTransition()

  const handleSearch = (values: FindBookingValues) => {
    setBooking(null)
    setError(null)
    setIsNotFound(false)

    startTransition(async () => {
      const result = await findBooking(values)
      setBooking(result.booking)
      setError(result.error)
      setIsNotFound(result.notFound)
      setLastName(result.booking ? values.lastName.trim() : null)
      setCancelError(null)
    })
  }

  const handleCancel = () => {
    if (!booking || !lastName) return

    setCancelError(null)
    startCancelTransition(async () => {
      const result = await cancelBookingAction(booking.code, lastName)
      if (result.booking) setBooking(result.booking)
      setCancelError(result.error)
    })
  }

  return (
    <Stack gap="xl">
      <Paper component="section" p={{ base: 'md', sm: 'xl' }} withBorder>
        <Stack gap="md">
          <div>
            <Title order={1}>Мои брони</Title>
            <Text c="dimmed" mt="xs">Введите код брони и фамилию пассажира, чтобы посмотреть детали поездки.</Text>
          </div>
          <FindBookingForm isLoading={isPending} onSearch={handleSearch} />
        </Stack>
      </Paper>

      {isPending && <Loader aria-label="Поиск брони" />}
      {error && (
        <Alert data-testid={isNotFound ? 'booking-not-found' : 'find-booking-error'} role="alert" color="red">
          {error}
        </Alert>
      )}
      {cancelError && <Alert data-testid="cancel-booking-error" role="alert" color="red">{cancelError}</Alert>}
      {booking && (
        <BookingDetails
          booking={booking}
          isCancelling={isCancelling}
          onCancel={handleCancel}
        />
      )}
    </Stack>
  )
}
