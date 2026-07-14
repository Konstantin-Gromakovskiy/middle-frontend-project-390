import { Container } from '@mantine/core'
import { getFlightById } from '@/entities/flight/api/getFlightById'
import { Booking } from '@/widgets/booking/ui/Booking'

type BookingPageProps = {
  params: Promise<{
    flightId: string
  }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { flightId } = await params
  const flight = await getFlightById(flightId)

  return (
    <Container component="main" size={1120} mt="xl" mb="xl">
      <Booking flight={flight} />
    </Container>
  )
}
