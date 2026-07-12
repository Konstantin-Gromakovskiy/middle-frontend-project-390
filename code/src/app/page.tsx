import { Box, Divider, Container, Group, Text } from '@mantine/core'

export default function Home() {
  return (
    <Box mih="100vh" px={{ base: 16, sm: 24 }}>
      <Container size={1120} px={0}>
        <Group component="header" h={84} justify="space-between">
          <Text c="blue" fw={800} fz="xl">
            Skybook
          </Text>
          <Text c="gray" fz="sm">
            Путешествия начинаются здесь
          </Text>
        </Group>
        <Divider />
      </Container>
    </Box>
  )
}
