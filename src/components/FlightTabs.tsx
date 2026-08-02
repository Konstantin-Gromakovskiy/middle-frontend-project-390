'use client'

import { Tabs } from '@mantine/core'
import { SpaLink, useSpaLocation } from '@/components/SpaRouter'

const tabs = [
  { value: 'search', label: 'Поиск рейсов', href: '/' },
  { value: 'bookings', label: 'Мои брони', href: '/lookup' },
]

export function FlightTabs() {
  const { pathname } = useSpaLocation()
  const activeTab = pathname.replace(/\/+$/, '') === '/lookup' ? 'bookings' : 'search'

  return (
    <Tabs value={activeTab} variant="pills">
      <Tabs.List aria-label="Разделы Skybook">
        {tabs.map(tab => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            renderRoot={props => <SpaLink {...props} href={tab.href} data-testid={tab.value === 'bookings' ? 'nav-lookup' : undefined} />}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}
