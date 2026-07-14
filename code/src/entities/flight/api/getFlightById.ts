import { serverApi } from '@/shered/api/server-api'

export function getFlightById(id: string) {
  return serverApi.flights.getById(id)
}
