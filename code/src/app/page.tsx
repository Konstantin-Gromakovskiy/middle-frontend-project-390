import { Paper, Stack, Text, Title } from '@mantine/core'

export default function Home() {
  return (
    <Paper component="main" maw={1120} mx="auto" mt="xl" p="xl" withBorder>
      <Stack gap="xs">
        <Title order={1}>Поиск рейсов</Title>
        <Text c="dimmed">Найдите подходящий рейс для следующего путешествия.</Text>
      </Stack>
    </Paper>
  )
}
