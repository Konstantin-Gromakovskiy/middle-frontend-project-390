import Link from 'next/link'
import { Button, Container, Stack, Text, Title } from '@mantine/core'

export default function BookingNotFound() {
  return (
    <Container component="main" size={1120} mt="xl">
      <Stack align="center" gap="md" ta="center">
        <Title order={1}>Рейс не найден</Title>
        <Text c="dimmed">
          Проверьте ссылку или вернитесь к поиску, чтобы выбрать другой рейс.
        </Text>
        <Button component={Link} href="/">
          Вернуться к поиску
        </Button>
      </Stack>
    </Container>
  )
}
