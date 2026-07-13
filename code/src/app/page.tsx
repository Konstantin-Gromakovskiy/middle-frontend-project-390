import { Container } from '@mantine/core'
import { getCities } from '@/features/search-flights/model/getCities'
import { FlightResults } from '@/widgets/flight-results/ui/FlightResults'

export default async function Home() {
  const cities = await getCities()

  return (
    <Container component="main">
      <FlightResults cities={cities} />
    </Container>
  )
}
