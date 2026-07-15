'use client'

import Link from 'next/link'
import { Tabs } from '@mantine/core'
import { usePathname } from 'next/navigation'

const tabs = [
  { value: 'search', label: 'Поиск рейсов', href: '/' },
  { value: 'bookings', label: 'Мои брони', href: '/bookings' },
]

export function FlightTabs() {
  const pathname = usePathname()
  const activeTab = pathname === '/bookings' ? 'bookings' : 'search'

  return (
    <Tabs value={activeTab} variant="pills">
      <Tabs.List aria-label="Разделы Skybook">
        {tabs.map(tab => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            renderRoot={props => <Link {...props} href={tab.href} data-testid={tab.value === 'bookings' ? 'nav-lookup' : undefined} />}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}
