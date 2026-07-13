import Link from 'next/link'
import { Badge, Button, Card, Divider, Group, Stack, Text } from '@mantine/core'
import type { Flight } from '@/shered/api/server-api.types'

type FlightCardProps = {
  flight: Flight
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function formatDuration(durationMinutes: number) {
  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60

  return `${hours} ч ${minutes} мин`
}

export function FlightCard({ flight }: FlightCardProps) {
  const price = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: flight.price.currency,
    maximumFractionDigits: 0,
  }).format(flight.price.amount)
  const origin = `${flight.origin.name} (${flight.origin.code})`
  const destination = `${flight.destination.name} (${flight.destination.code})`

  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={600}>{flight.airline.name}</Text>
          <Text c="dimmed" size="sm">
            {`${flight.flightNumber}`}
          </Text>
        </Group>

        <Divider />

        <Group justify="space-between" align="center">
          <div>
            <Text fw={700} size="xl">
              {formatTime(flight.departureAt)}
            </Text>
            <Text size="sm">
              {origin}
            </Text>
          </div>
          <Badge variant="light">{formatDuration(flight.durationMinutes)}</Badge>
          <div>
            <Text fw={700} size="xl" ta="right">
              {formatTime(flight.arrivalAt)}
            </Text>
            <Text size="sm" ta="right">
              {destination}
            </Text>
          </div>
        </Group>

        <Group justify="space-between" align="center">
          <Text fw={700} size="lg">
            {price}
          </Text>
          <Button component={Link} href={`/booking/${flight.id}`}>
            Забронировать
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}
