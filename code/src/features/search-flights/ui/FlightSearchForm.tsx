'use client'

import { Alert, Autocomplete, Button, Flex, NumberInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useRef, useState, useTransition } from 'react'
import type { City, Flight } from '@/shered/api/server-api.types'
import { searchFlights } from '../model/searchFlights'
import type { FlightSearchValues } from '../model/types'

type FlightSearchFormProps = {
  cities: City[]
  onFlightsFound: (flights: Flight[]) => void
}

function useRequestSequence() {
  const sequence = useRef(0)

  return {
    next: () => {
      sequence.current += 1
      return sequence.current
    },
    isLatest: (requestId: number) => requestId === sequence.current,
  }
}

export function FlightSearchForm({ cities, onFlightsFound }: FlightSearchFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const requestSequence = useRequestSequence()
  const form = useForm<FlightSearchValues>({
    initialValues: {
      origin: '',
      destination: '',
      departureDate: new Date(),
      passengers: 1,
    },
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
    const requestId = requestSequence.next()
    setError(null)

    startTransition(async () => {
      try {
        const flights = await searchFlights({
          ...values,
          origin: getCityCode(values.origin),
          destination: getCityCode(values.destination),
        })

        if (requestSequence.isLatest(requestId)) {
          onFlightsFound(flights)
        }
      }
      catch {
        if (requestSequence.isLatest(requestId)) {
          setError('Не удалось найти рейсы. Проверьте параметры поиска и попробуйте снова.')
        }
      }
    })
  }
  const submitForm = form.onSubmit(handleSubmit)

  const cityOptions = cities.map(({ code, name, country }) => ({
    value: code,
    label: `${name}${country ? `, ${country}` : ''} (${code})`,
  }))

  return (
    <form onSubmit={submitForm}>
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

        <Button type="submit" loading={isPending}>
          Найти
        </Button>
      </Flex>
      {error && <Alert role="alert" mt="md" color="red">{error}</Alert>}
    </form>
  )
}
