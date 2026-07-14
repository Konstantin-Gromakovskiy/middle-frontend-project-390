import { Badge, Card, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core'
import type { Flight } from '@/shered/api/server-api.types'

type FlightBookingSummaryProps = {
  flight: Flight
}

export function FlightBookingSummary({ flight }: FlightBookingSummaryProps) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text c="dimmed" size="sm">Авиакомпания</Text>
            <Text fw={700} size="lg">{flight.airline.name}</Text>
          </div>
          <Badge variant="light" size="lg">{flight.flightNumber}</Badge>
        </Group>
        <Divider />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text c="dimmed" size="sm">Город отправления</Text>
            <Text fw={600}>{flight.origin.name}</Text>
            <Text c="dimmed" size="sm">{flight.origin.code}</Text>
          </div>
          <div>
            <Text c="dimmed" size="sm">Город прибытия</Text>
            <Text fw={600}>{flight.destination.name}</Text>
            <Text c="dimmed" size="sm">{flight.destination.code}</Text>
          </div>
        </SimpleGrid>
      </Stack>
    </Card>
  )
}
