'use server'

import dayjs from 'dayjs'
import { getFlight } from '@/entities/flight/api/getFlight'
import type { FlightSearchValues } from './types'

export async function searchFlights(values: FlightSearchValues) {
  const result = await getFlight({
    origin: values.origin,
    destination: values.destination,
    date: dayjs(values.departureDate).format('YYYY-MM-DD'),
    passengers: values.passengers,
  })

  return result
}
