'use client'

import { Alert, Loader, Paper, Stack, Text, Title } from '@mantine/core'
import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { FlightCard } from '@/entities/flight/ui/FlightCard'
import { searchFlights } from '@/features/search-flights/model/searchFlights'
import { FlightSearchForm } from '@/features/search-flights/ui/FlightSearchForm'
import type { City, Flight } from '@/shered/api/server-api.types'
import type { FlightSearchValues } from '@/features/search-flights/model/types'

type FlightResultsProps = {
  cities: City[]
}

type SearchState = { status: 'loading' } | { status: 'success', flights: Flight[] } | { status: 'error' }

export function FlightResults({ cities }: FlightResultsProps) {
  const [isPending, startTransition] = useTransition()
  const requestSequence = useRef(0)
  const [initialValues] = useState<FlightSearchValues>(() => ({
    origin: cities[0]?.code ?? '',
    destination: cities[1]?.code ?? '',
    departureDate: new Date(),
    passengers: 1,
  }))
  const hasInitialRoute = Boolean(initialValues.origin && initialValues.destination)
  const [searchState, setSearchState] = useState<SearchState>({
    status: hasInitialRoute ? 'loading' : 'error',
  })

  const startSearch = useCallback((values: FlightSearchValues) => {
    const requestId = requestSequence.current + 1
    requestSequence.current = requestId

    startTransition(async () => {
      try {
        const flights = await searchFlights(values)

        if (requestId === requestSequence.current) {
          setSearchState({ status: 'success', flights })
        }
      }
      catch {
        if (requestId === requestSequence.current) {
          setSearchState({ status: 'error' })
        }
      }
    })
  }, [])

  const handleSearch = useCallback((values: FlightSearchValues) => {
    setSearchState({ status: 'loading' })
    startSearch(values)
  }, [startSearch])

  useEffect(() => {
    if (hasInitialRoute) startSearch(initialValues)
  }, [hasInitialRoute, initialValues, startSearch])

  const isLoading = isPending || searchState.status === 'loading'

  return (
    <Paper component="section" p={{ base: 'md', sm: 'xl' }}>
      <Stack gap="xl">
        <FlightSearchForm
          cities={cities}
          initialValues={initialValues}
          isLoading={isLoading}
          onSearch={handleSearch}
        />

        <section data-testid="flight-results" aria-live="polite">
          <Stack gap="md">
            <Title order={2}>Рейсы</Title>
            {isLoading && <Loader aria-label="Загрузка рейсов" />}
            {searchState.status === 'error' && (
              <Alert data-testid="flights-error" role="alert" color="red">
                Не удалось найти рейсы. Проверьте параметры поиска и попробуйте снова.
              </Alert>
            )}
            {searchState.status === 'success' && searchState.flights.length === 0 && (
              <Text data-testid="flights-empty" c="dimmed">На выбранную дату рейсов не найдено.</Text>
            )}
            {searchState.status === 'success' && searchState.flights.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </Stack>
        </section>
      </Stack>
    </Paper>
  )
}
