'use client'

import { Paper, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { FlightCard } from '@/entities/flight/ui/FlightCard'
import { FlightSearchForm } from '@/features/search-flights/ui/FlightSearchForm'
import type { City, Flight } from '@/shered/api/server-api.types'

type FlightResultsProps = {
  cities: City[]
}

export function FlightResults({ cities }: FlightResultsProps) {
  const [flights, setFlights] = useState<Flight[] | null>(null)

  return (
    <Paper component="section" p={{ base: 'md', sm: 'xl' }}>
      <Stack gap="xl">
        <FlightSearchForm cities={cities} onFlightsFound={setFlights} />

        {flights !== null && (
          <section>
            <Stack gap="md">
              <Title order={2}>Рейсы</Title>
              {flights.length === 0
                ? <Text c="dimmed">На выбранную дату рейсов не найдено.</Text>
                : flights.map(flight => <FlightCard key={flight.id} flight={flight} />)}
            </Stack>
          </section>
        )}
      </Stack>
    </Paper>
  )
}
