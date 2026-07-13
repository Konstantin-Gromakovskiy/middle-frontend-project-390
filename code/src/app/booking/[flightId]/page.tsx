import { Container, Stack, Text, Title } from '@mantine/core'

type BookingPageProps = {
  params: Promise<{
    flightId: string
  }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { flightId } = await params
  const message = `Оформление рейса ${flightId} пока недоступно. Страница бронирования скоро будет готова.`

  return (
    <Container component="main" maw={1120} mx="auto" mt="xl" p="xl">
      <Stack gap="md">
        <Title order={1}>Бронирование рейса</Title>
        <Text c="dimmed">{message}</Text>
      </Stack>
    </Container>
  )
}
