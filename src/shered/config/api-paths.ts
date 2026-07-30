export const apiPaths = {
  cities: () => '/api/cities',
  flights: () => '/api/flights',
  flight: (id: string) => `/api/flights/${encodeURIComponent(id)}`,
  bookings: () => '/api/bookings',
  booking: (code: string) => `/api/bookings/${encodeURIComponent(code)}`,
}
