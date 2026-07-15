'use client'

import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: 'frontend-390@1.0.0',
  tracesSampleRate: 0,
})

export function SentryInit() {
  return null
}
