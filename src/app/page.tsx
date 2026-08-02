'use client'

import { Container, Title } from '@mantine/core'
import { useSpaLocation } from '@/components/SpaRouter'
import { BookingLookupPage } from '@/widgets/booking-lookup-page/ui/BookingLookupPage'
import { BookingPage } from '@/widgets/booking-page/ui/BookingPage'
import { FlightResults } from '@/widgets/flight-results/ui/FlightResults'

function SpaContent() {
  const { pathname } = useSpaLocation()
  const route = pathname.replace(/\/+$/, '') || '/'

  if (route === '/lookup') return <BookingLookupPage />
  if (route === '/booking') return <BookingPage />

  return (
    <Container component="main">
      <Title order={1}>Поиск авиабилетов</Title>
      <FlightResults />
    </Container>
  )
}

export default function Home() {
  return <SpaContent />
}
