'use client'

import { Button, Flex, NumberInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import type { City } from '@/shered/api/server-api.types'

type FlightSearchValues = {
  origin: string
  destination: string
  departureDate: Date | null
  passengers: number
}

type FlightSearchFormProps = {
  cities: City[]
  searchAction: (values: FlightSearchValues) => void
}

export function FlightSearchForm({ searchAction }: FlightSearchFormProps) {
  const form = useForm<FlightSearchValues>({
    initialValues: {
      origin: '',
      destination: '',
      departureDate: null,
      passengers: 1,
    },
  })

  const submitFrom = form.onSubmit((values) => {
    searchAction(values)
  })

  return (
    <form onSubmit={submitFrom}>
      <Flex gap="lg" align="flex-end">
        <TextInput label="Откуда" placeholder="Город вылета" {...form.getInputProps('origin')} />
        <TextInput label="Куда" placeholder="Город прилёта" {...form.getInputProps('destination')} />
        <DateInput
          label="Дата"
          placeholder="Выберите дату"
          valueFormat="DD.MM.YYYY"
          clearable
          {...form.getInputProps('departureDate')}
        />
        <NumberInput
          label="Пассажиры"
          placeholder="Количество пассажиров"
          min={1}
          allowDecimal={false}
          allowNegative={false}
          {...form.getInputProps('passengers')}
        />

        <Button type="submit">Найти</Button>
      </Flex>
    </form>
  )
}
