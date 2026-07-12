import { Paper } from '@mantine/core'
import { getCities } from '@/features/search-flights/model/getCities'
import { FlightSearchForm } from '@/features/search-flights/ui/FlightSearchForm'

export async function FlightResults() {
  const cities = await getCities()

  return (
    <Paper component="section" p={{ base: 'md', sm: 'xl' }}>
      <FlightSearchForm cities={cities} />
    </Paper>
  )
}
