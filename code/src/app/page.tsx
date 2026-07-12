import { Container, Paper, Stack, Text, Title } from '@mantine/core'
import { FlightResults } from '@/widgets/flight-results/ui/FlightResults'

export default function Home() {
  return (
    <Container component="main">
      <FlightResults />
    </Container>
  )
}
