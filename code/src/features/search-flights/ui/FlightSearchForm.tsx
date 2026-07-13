'use client'

import { Autocomplete, Button, Flex, NumberInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import type { FlightSearchValues } from '../model/types'
import type { City } from '@/shered/api/server-api.types'

type FlightSearchFormProps = {
  cities: City[]
  initialValues: FlightSearchValues
  isLoading: boolean
  onSearch: (values: FlightSearchValues) => void
}

export function FlightSearchForm({ cities, initialValues, isLoading, onSearch }: FlightSearchFormProps) {
  const form = useForm<FlightSearchValues>({
    initialValues,
    validate: {
      origin: value => value.trim().length > 0 ? null : 'Укажите город вылета',
      destination: value => value.trim().length > 0 ? null : 'Укажите город прилёта',
      departureDate: value => value instanceof Date && !Number.isNaN(value.getTime()) ? null : 'Укажите дату',
      passengers: value => value >= 1 ? null : 'Укажите хотя бы одного пассажира',
    },
  })

  const getCityCode = (value: string) => {
    const city = cities.find(({ code, name, country }) => {
      const label = `${name}${country ? `, ${country}` : ''} (${code})`

      return value === code || value === label
    })

    return city?.code ?? value
  }

  const handleSubmit = (values: FlightSearchValues) => {
    onSearch({
      ...values,
      origin: getCityCode(values.origin),
      destination: getCityCode(values.destination),
    })
  }
  const submitForm = form.onSubmit(handleSubmit)

  const cityOptions = cities.map(({ code, name, country }) => ({
    value: code,
    label: `${name}${country ? `, ${country}` : ''} (${code})`,
  }))

  return (
    <form data-testid="flight-search-form" onSubmit={submitForm}>
      <Flex gap="lg" align="flex-end">
        <Autocomplete
          label="Откуда"
          placeholder="Город вылета"
          data={cityOptions}
          data-testid="search-origin"
          {...form.getInputProps('origin')}
        />
        <Autocomplete
          label="Куда"
          placeholder="Город прилёта"
          data={cityOptions}
          data-testid="search-destination"
          {...form.getInputProps('destination')}
        />
        <DateInput
          label="Дата"
          placeholder="Выберите дату"
          valueFormat="DD.MM.YYYY"
          clearable
          data-testid="search-date"
          {...form.getInputProps('departureDate')}
        />
        <NumberInput
          label="Пассажиры"
          placeholder="Количество пассажиров"
          min={1}
          allowDecimal={false}
          allowNegative={false}
          data-testid="search-passengers"
          {...form.getInputProps('passengers')}
        />

        <Button type="submit" loading={isLoading} data-testid="search-submit">
          Найти
        </Button>
      </Flex>
    </form>
  )
}
