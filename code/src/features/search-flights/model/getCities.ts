import { serverApi } from '@/shered/api/server-api'

export async function getCities() {
  return serverApi.cities.list()
}
