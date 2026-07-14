import type {
  Booking,
  City,
  CreateBookingRequest,
  Flight,
  SearchFlightsParams,
} from './server-api.types'
import { apiPaths } from '@/shered/config/api-paths'
import { ApiError, getApiErrorResponse } from './api-error'

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined')
  return apiUrl.replace(/\/$/, '')
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiUrl()}${path}`, init)

  if (!response.ok) {
    const error = await getApiErrorResponse(response)
    throw new ApiError(response.status, error?.code, error?.message ?? response.statusText)
  }

  return response.json()
}

type QueryValue = string | number | undefined

function withQuery<T extends Record<string, QueryValue>>(path: string, params: T) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value))
  }

  return `${path}?${query.toString()}`
}

export const serverApi = {
  cities: {
    list: () => request<City[]>(apiPaths.cities(), { cache: 'force-cache' }),
  },
  flights: {
    search: (params: SearchFlightsParams) =>
      request<Flight[]>(
        withQuery(apiPaths.flights(), {
          origin: params.origin,
          destination: params.destination,
          date: params.date,
          passengers: params.passengers,
        }),
      ),
    getById: (id: string) => request<Flight>(apiPaths.flight(id)),
  },
  bookings: {
    create: (body: CreateBookingRequest) =>
      request<Booking>(apiPaths.bookings(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    getByCode: (code: string, lastName: string) =>
      request<Booking>(
        withQuery(apiPaths.booking(code), { lastName }),
      ),
    cancel: (code: string, lastName: string) =>
      request<Booking>(
        withQuery(apiPaths.booking(code), { lastName }),
        { method: 'DELETE' },
      ),
  },
} as const
