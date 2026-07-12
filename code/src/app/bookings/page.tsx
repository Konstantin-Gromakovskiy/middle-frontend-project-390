import { Container, Stack, Text, Title } from '@mantine/core'

export default function BookingsPage() {
  return (
    <Container component="main" maw={1120} mx="auto" mt="xl" p="xl">
      <Stack gap="xs">
        <Title order={1}>Мои брони</Title>
        <Text c="dimmed">Здесь будут отображаться ваши забронированные рейсы.</Text>
      </Stack>
    </Container>
  )
}
