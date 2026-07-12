import { Paper } from '@mantine/core'
import { FlightSearchForm } from '@/features/search-flights/ui/FlightSearchForm'

export function FlightResults() {
  const searchFlights = async (values: unknown) => {
    'use server'
    console.log('values', values)
  }

  return (
    <Paper component="section" p={{ base: 'md', sm: 'xl' }}>
      <FlightSearchForm searchAction={searchFlights} />
    </Paper>
  )
}
