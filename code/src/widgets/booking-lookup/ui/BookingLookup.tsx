'use client'

import { Alert, Loader, Paper, Stack, Text, Title } from '@mantine/core'
import { useState, useTransition } from 'react'
import { BookingDetails } from '@/entities/booking/ui/BookingDetails'
import { findBooking } from '@/features/find-booking/model/findBooking'
import { FindBookingForm } from '@/features/find-booking/ui/FindBookingForm'
import type { FindBookingValues } from '@/features/find-booking/model/types'
import type { Booking } from '@/shered/api/server-api.types'

export function BookingLookup() {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSearch = (values: FindBookingValues) => {
    setBooking(null)
    setError(null)

    startTransition(async () => {
      const result = await findBooking(values)
      setBooking(result.booking)
      setError(result.error)
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
      {error && <Alert data-testid="find-booking-error" role="alert" color="red">{error}</Alert>}
      {booking && <BookingDetails booking={booking} />}
    </Stack>
  )
}
