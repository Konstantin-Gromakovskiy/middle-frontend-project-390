import { Container } from '@mantine/core'
import { Booking } from '@/widgets/booking/ui/Booking'
import type { Flight } from '@/shered/api/server-api.types'

type BookingPageProps = {
  params: Promise<{
    flightId: string
  }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { flightId } = await params

  // TODO: заменить hardcode запросом рейса по flightId после подключения API.
  const flight: Flight = {
    id: flightId,
    flightNumber: 'SU1234',
    airline: { code: 'SU', name: 'Аэрофлот' },
    origin: { code: 'MOW', name: 'Москва', country: 'Россия' },
    destination: { code: 'LED', name: 'Санкт-Петербург', country: 'Россия' },
    departureAt: '2026-07-01T08:00:00Z',
    arrivalAt: '2026-07-01T09:25:00Z',
    durationMinutes: 85,
    price: { amount: 5400, currency: 'RUB' },
    seatsAvailable: 42,
  }

  return (
    <Container component="main" size={1120} mt="xl" mb="xl">
      <Booking flight={flight} />
    </Container>
  )
}
