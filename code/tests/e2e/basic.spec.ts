import { test, expect } from '@playwright/test'

test('basic test', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Create Next App')
})

test('flight tabs switch pages', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('tab', { name: 'Поиск рейсов' })).toHaveAttribute('aria-selected', 'true')
  await page.getByRole('tab', { name: 'Мои брони' }).click()

  await expect(page).toHaveURL(/\/bookings$/)
  await expect(page.getByRole('heading', { name: 'Мои брони' })).toBeVisible()

  await page.getByRole('tab', { name: 'Поиск рейсов' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Поиск рейсов' })).toBeVisible()
})
