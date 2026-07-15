import { Badge, Button, Card, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import type { Booking } from '@/shered/api/server-api.types'

type BookingDetailsProps = {
  booking: Booking
}

const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value))
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(amount)
}

export function BookingDetails({ booking }: BookingDetailsProps) {
  const isCancelled = booking.status === 'cancelled'

  return (
    <Card component="section" data-testid="booking-details" withBorder radius="md" padding="lg">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text c="dimmed" size="sm">Код брони</Text>
            <Title order={2}>{booking.code}</Title>
          </div>
          <Badge color={isCancelled ? 'gray' : 'green'} variant="light" size="lg">
            {isCancelled ? 'Отменена' : 'Подтверждена'}
          </Badge>
        </Group>

        <section aria-labelledby="booking-flight-title">
          <Stack gap="md">
            <Group justify="space-between">
              <Text id="booking-flight-title" fw={700} size="lg">
                Рейс
                {' '}
                {booking.flight.flightNumber}
              </Text>
              <Text c="dimmed">{booking.flight.airline.name}</Text>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <div>
                <Text c="dimmed" size="sm">Вылет</Text>
                <Text fw={600}>
                  {booking.flight.origin.name}
                  {' ('}
                  {booking.flight.origin.code}
                  )
                </Text>
                <Text>{formatDateTime(booking.flight.departureAt)}</Text>
              </div>
              <div>
                <Text c="dimmed" size="sm">Прилёт</Text>
                <Text fw={600}>
                  {booking.flight.destination.name}
                  {' ('}
                  {booking.flight.destination.code}
                  )
                </Text>
                <Text>{formatDateTime(booking.flight.arrivalAt)}</Text>
              </div>
            </SimpleGrid>
          </Stack>
        </section>

        <Divider />

        <section aria-labelledby="booking-passengers-title">
          <Stack gap="xs">
            <Text id="booking-passengers-title" fw={700} size="lg">Пассажиры</Text>
            {booking.passengers.map((passenger, index) => (
              <Text key={`${passenger.firstName}-${passenger.lastName}-${index}`}>
                {passenger.firstName}
                {' '}
                {passenger.lastName}
              </Text>
            ))}
          </Stack>
        </section>

        <Group justify="space-between" align="flex-end">
          <div>
            <Text c="dimmed" size="sm">Создана</Text>
            <Text>{formatDateTime(booking.createdAt)}</Text>
          </div>
          <div>
            <Text c="dimmed" size="sm">Итого</Text>
            <Text fw={700} size="lg">{formatMoney(booking.totalPrice.amount, booking.totalPrice.currency)}</Text>
          </div>
        </Group>

        {!isCancelled && (
          <Button type="button" variant="light" color="red" disabled data-testid="cancel-booking">
            Отменить бронирование
          </Button>
        )}
      </Stack>
    </Card>
  )
}
