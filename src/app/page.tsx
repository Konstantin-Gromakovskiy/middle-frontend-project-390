import { Container, Title } from '@mantine/core'
import { FlightResults } from '@/widgets/flight-results/ui/FlightResults'

export default function Home() {
  return (
    <Container component="main">
      <Title order={1}>Поиск авиабилетов</Title>
      <FlightResults />
    </Container>
  )
}
