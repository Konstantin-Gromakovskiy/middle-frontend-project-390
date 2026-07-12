import { Paper } from '@mantine/core'
import { FlightSearchForm } from '@/features/search-flights/ui/FlightSearchForm'
import { getCities } from './get-cities'

export async function FlightResults() {
  const cities = await getCities()

  const searchFlights = async (values: unknown) => {
    'use server'
    console.log('values', values)
  }

  return (
    <Paper component="section" p={{ base: 'md', sm: 'xl' }}>
      <FlightSearchForm cities={cities} searchAction={searchFlights} />
    </Paper>
  )
}
