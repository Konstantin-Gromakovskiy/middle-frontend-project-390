'use client'

import { Autocomplete, Button, Flex, NumberInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import type { City } from '@/shered/api/server-api.types'
import { searchFlights } from '../model/searchFlights'
import type { FlightSearchValues } from '../model/types'

type FlightSearchFormProps = {
  cities: City[]
}

export function FlightSearchForm({ cities }: FlightSearchFormProps) {
  const form = useForm<FlightSearchValues>({
    initialValues: {
      origin: '',
      destination: '',
      departureDate: new Date(),
      passengers: 1,
    },
  })

  const submitFrom = form.onSubmit((values) => {
    searchFlights(values)
  })

  const cityOptions = cities.map(({ code, name, country }) => ({
    value: code,
    label: `${name}${country ? `, ${country}` : ''} (${code})`,
  }))

  return (
    <form onSubmit={submitFrom}>
      <Flex gap="lg" align="flex-end">
        <Autocomplete
          label="Откуда"
          placeholder="Город вылета"
          data={cityOptions}
          {...form.getInputProps('origin')}
        />
        <Autocomplete
          label="Куда"
          placeholder="Город прилёта"
          data={cityOptions}
          {...form.getInputProps('destination')}
        />
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
