import { Paper, Stack, Text, Title } from '@mantine/core'
import { FlightBookingSummary } from '@/entities/flight/ui/FlightBookingSummary'
import { BookingForm } from '@/features/create-booking/ui/BookingForm'
import type { Flight } from '@/shered/api/server-api.types'

type BookingProps = {
  flight: Flight
}

export function Booking({ flight }: BookingProps) {
  return (
    <Paper component="section" p={{ base: 'md', sm: 'xl' }} withBorder radius="md">
      <Stack gap="xl">
        <div>
          <Title order={1}>Оформление бронирования</Title>
          <Text c="dimmed" mt="xs">Проверьте данные рейса и заполните информацию о пассажирах</Text>
        </div>
        <FlightBookingSummary flight={flight} />
        <BookingForm flightId={flight.id} />
      </Stack>
    </Paper>
  )
}
