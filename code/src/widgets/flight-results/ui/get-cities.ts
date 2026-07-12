import { serverApi } from '@/shered/api/server-api'

export function getCities() {
  return serverApi.cities.list()
}
