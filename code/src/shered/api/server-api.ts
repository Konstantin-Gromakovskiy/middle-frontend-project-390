import type {
  ApiErrorResponse,
  Booking,
  City,
  CreateBookingRequest,
  Flight,
  SearchFlightsParams,
} from './server-api.types'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code?: string,
    message = 'API request failed',
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function getApiUrl() {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    throw new Error('API_URL is not defined')
  }

  return apiUrl.replace(/\/$/, '')
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiUrl()}${path}`, init)

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as ApiErrorResponse
    throw new ApiError(response.status, error.code, error.message ?? response.statusText)
  }

  return response.json() as Promise<T>
}

function withQuery(path: string, params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      query.set(key, String(value))
    }
  }

  return `${path}?${query.toString()}`
}

export const serverApi = {
  cities: {
    list: () => request<City[]>('/api/cities'),
  },
  flights: {
    search: (params: SearchFlightsParams) =>
      request<Flight[]>(
        withQuery('/api/flights', {
          origin: params.origin,
          destination: params.destination,
          date: params.date,
          passengers: params.passengers,
        }),
      ),
    getById: (id: string) => request<Flight>(`/api/flights/${encodeURIComponent(id)}`),
  },
  bookings: {
    create: (body: CreateBookingRequest) =>
      request<Booking>('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    getByCode: (code: string, lastName: string) =>
      request<Booking>(
        withQuery(`/api/bookings/${encodeURIComponent(code)}`, { lastName }),
      ),
    cancel: (code: string, lastName: string) =>
      request<Booking>(
        withQuery(`/api/bookings/${encodeURIComponent(code)}`, { lastName }),
        { method: 'DELETE' },
      ),
  },
} as const
