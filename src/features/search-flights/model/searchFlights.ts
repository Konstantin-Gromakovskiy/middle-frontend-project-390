import dayjs from 'dayjs'
import { searchFlights as searchFlightsApi } from '@/entities/flight/api/searchFlights'
import type { FlightSearchValues } from './types'

export async function searchFlights(values: FlightSearchValues) {
  const result = await searchFlightsApi({
    origin: values.origin,
    destination: values.destination,
    date: dayjs(values.departureDate).format('YYYY-MM-DD'),
    passengers: values.passengers,
  })

  return result
}
