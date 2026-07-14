import { Container } from '@mantine/core'
import { notFound } from 'next/navigation'
import { getFlightById } from '@/entities/flight/api/getFlightById'
import { ApiError } from '@/shered/api/api-error'
import { Booking } from '@/widgets/booking/ui/Booking'

type BookingPageProps = {
  params: Promise<{
    flightId: string
  }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { flightId } = await params
  let flight

  try {
    flight = await getFlightById(flightId)
  }
  catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()

    throw error
  }

  return (
    <Container component="main" size={1120} mt="xl" mb="xl">
      <Booking flight={flight} />
    </Container>
  )
}
