import { serverApi } from '@/shered/api/server-api'
import type { SearchFlightsParams } from '@/shered/api/server-api.types'

export function getFlight(params: SearchFlightsParams) {
  return serverApi.flights.search(params)
}
