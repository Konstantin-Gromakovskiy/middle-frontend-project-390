'use client'

import { Button, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { FindBookingValues } from '../model/types'

type FindBookingFormProps = {
  isLoading: boolean
  onSearch: (values: FindBookingValues) => void
}

export function FindBookingForm({ isLoading, onSearch }: FindBookingFormProps) {
  const form = useForm<FindBookingValues>({
    initialValues: { bookingCode: '', lastName: '' },
    validate: {
      bookingCode: value => value.trim().length > 0 ? null : 'Введите код брони',
      lastName: value => value.trim().length > 0 ? null : 'Введите фамилию',
    },
  })

  return (
    <form data-testid="booking-lookup-form" onSubmit={form.onSubmit(onSearch)}>
      <Stack gap="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Код брони"
            placeholder="Например, AB1234"
            autoComplete="off"
            data-testid="lookup-code"
            {...form.getInputProps('bookingCode')}
          />
          <TextInput
            label="Фамилия пассажира"
            placeholder="Например, Петров"
            autoComplete="family-name"
            data-testid="lookup-lastName"
            {...form.getInputProps('lastName')}
          />
        </SimpleGrid>
        <Button type="submit" loading={isLoading} data-testid="lookup-submit">
          Найти
        </Button>
      </Stack>
    </form>
  )
}
