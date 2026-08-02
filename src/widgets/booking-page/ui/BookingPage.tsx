'use client'

import { Alert, Container, Loader, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { getFlightById } from '@/entities/flight/api/getFlightById'
import type { Flight } from '@/shered/api/server-api.types'
import { useSpaLocation } from '@/components/SpaRouter'
import { Booking } from '@/widgets/booking/ui/Booking'

export function BookingPage() {
  const { search } = useSpaLocation()
  const [flight, setFlight] = useState<Flight | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const id = new URLSearchParams(search).get('flightId')
    let isCurrent = true

    Promise.resolve().then(() => {
      if (isCurrent) {
        setFlight(null)
        setHasError(false)
      }
    })

    if (!id) {
      Promise.resolve().then(() => {
        if (isCurrent) setHasError(true)
      })
      return () => {
        isCurrent = false
      }
    }

    getFlightById(id)
      .then((result) => {
        if (isCurrent) setFlight(result)
      })
      .catch(() => {
        if (isCurrent) setHasError(true)
      })

    return () => {
      isCurrent = false
    }
  }, [search])

  if (hasError) {
    return (
      <Container component="main" size={1120} mt="xl" mb="xl">
        <Alert role="alert" color="red">Не удалось загрузить данные рейса.</Alert>
      </Container>
    )
  }

  if (!flight) {
    return (
      <Container component="main" size={1120} mt="xl" mb="xl">
        <Stack align="center">
          <Loader aria-label="Загрузка рейса" />
        </Stack>
      </Container>
    )
  }

  return (
    <Container component="main" size={1120} mt="xl" mb="xl">
      <Booking flight={flight} />
    </Container>
  )
}
