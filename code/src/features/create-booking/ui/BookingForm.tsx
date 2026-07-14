'use client'

import { Alert, Button, Card, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { useState, useTransition } from 'react'
import { createBookingAction } from '../model/createBookingAction'
import type { BookingFormValues, PassengerFormValues } from '../model/types'

const emptyPassenger: PassengerFormValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  documentSeries: '',
  documentNumber: '',
}

type BookingFormProps = {
  flightId: string
}

export function BookingForm({ flightId }: BookingFormProps) {
  const [isPending, startTransition] = useTransition()
  const [bookingCode, setBookingCode] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const form = useForm<BookingFormValues>({
    initialValues: {
      email: '',
      phone: '',
      passengers: [{ ...emptyPassenger }],
    },
    validate: {
      email: value => /^\S+@\S+\.\S+$/.test(value) ? null : 'Введите корректный email',
      phone: value => value.trim().length > 0 ? null : 'Введите номер телефона',
      passengers: {
        firstName: value => value.trim().length > 0 ? null : 'Введите имя',
        lastName: value => value.trim().length > 0 ? null : 'Введите фамилию',
        dateOfBirth: value => value && dayjs(value).isValid() ? null : 'Укажите дату рождения',
        documentSeries: value => value.trim().length > 0 ? null : 'Введите серию документа',
        documentNumber: value => value.trim().length > 0 ? null : 'Введите номер документа',
      },
    },
  })

  const addPassenger = () => {
    form.insertListItem('passengers', { ...emptyPassenger })
    setBookingCode(null)
    setSubmitError(null)
  }

  const handleSubmit = (values: BookingFormValues) => {
    setBookingCode(null)
    setSubmitError(null)

    startTransition(async () => {
      const result = await createBookingAction(flightId, values)

      if (!result.success) {
        setSubmitError(result.error ?? 'Не удалось создать бронирование. Попробуйте ещё раз.')
        return
      }

      setBookingCode(result.bookingCode ?? null)
    })
  }

  if (bookingCode) {
    return (
      <Alert data-testid="booking-success" color="green" title="Бронирование создано" role="status">
        Код брони:
        <Text span fw={700}>
          {bookingCode}
        </Text>
      </Alert>
    )
  }

  return (
    <form data-testid="booking-form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="xl">
        <section aria-labelledby="contact-details-title">
          <Stack gap="md">
            <div>
              <Text id="contact-details-title" fw={700} size="lg">Контактные данные</Text>
              <Text c="dimmed" size="sm">На эти контакты мы отправим маршрутную квитанцию</Text>
            </div>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                type="email"
                data-testid="booking-email"
                {...form.getInputProps('email')}
              />
              <TextInput
                label="Номер телефона"
                placeholder="+7 (900) 000-00-00"
                type="tel"
                data-testid="booking-phone"
                {...form.getInputProps('phone')}
              />
            </SimpleGrid>
          </Stack>
        </section>

        <section aria-labelledby="passengers-title">
          <Stack gap="md">
            <div>
              <Text id="passengers-title" fw={700} size="lg">Данные пассажиров</Text>
              <Text c="dimmed" size="sm">Заполните данные каждого пассажира латиницей или кириллицей</Text>
            </div>
            {form.values.passengers.map((_, index) => (
              <Card key={form.key(`passengers.${index}`)} withBorder radius="md" padding="lg">
                <Stack gap="md">
                  <Text fw={600}>
                    Пассажир
                    {' '}
                    {index + 1}
                  </Text>
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      label="Имя"
                      placeholder="Иван"
                      data-testid={`passenger-${index}-first-name`}
                      {...form.getInputProps(`passengers.${index}.firstName`)}
                    />
                    <TextInput
                      label="Фамилия"
                      placeholder="Иванов"
                      data-testid={`passenger-${index}-last-name`}
                      {...form.getInputProps(`passengers.${index}.lastName`)}
                    />
                    <DateInput
                      label="Дата рождения"
                      placeholder="ДД.ММ.ГГГГ"
                      valueFormat="DD.MM.YYYY"
                      maxDate={new Date()}
                      data-testid={`passenger-${index}-birth-date`}
                      {...form.getInputProps(`passengers.${index}.dateOfBirth`)}
                    />
                    <Group align="flex-start" gap="sm" wrap="nowrap">
                      <TextInput
                        label="Серия документа"
                        placeholder="1234"
                        data-testid={`passenger-${index}-document-series`}
                        {...form.getInputProps(`passengers.${index}.documentSeries`)}
                      />
                      <TextInput
                        label="Номер документа"
                        placeholder="567890"
                        data-testid={`passenger-${index}-document-number`}
                        {...form.getInputProps(`passengers.${index}.documentNumber`)}
                      />
                    </Group>
                  </SimpleGrid>
                </Stack>
              </Card>
            ))}
            <Button type="button" variant="light" onClick={addPassenger} disabled={isPending} data-testid="add-passenger">
              Добавить пассажира
            </Button>
          </Stack>
        </section>

        <Stack gap="md" align="flex-start">
          <Button type="submit" size="md" loading={isPending} data-testid="submit-booking">
            Забронировать
          </Button>
          {submitError && <Alert color="red" role="alert">{submitError}</Alert>}
        </Stack>
      </Stack>
    </form>
  )
}
