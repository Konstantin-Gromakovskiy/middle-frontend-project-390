import { Container } from '@mantine/core'
import { BookingLookup } from '@/widgets/booking-lookup/ui/BookingLookup'

export default function BookingsPage() {
  return (
    <Container component="main" size={1120} mt="xl" mb="xl">
      <BookingLookup />
    </Container>
  )
}
