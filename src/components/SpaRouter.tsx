'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type SpaLocation = {
  pathname: string
  search: string
}

type SpaRouterContextValue = SpaLocation & {
  navigate: (href: string) => void
}

const SpaRouterContext = createContext<SpaRouterContextValue | null>(null)

function getLocation(): SpaLocation {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
  }
}

export function SpaRouter({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<SpaLocation>({ pathname: '/', search: '' })

  useEffect(() => {
    const handlePopState = () => setLocation(getLocation())

    queueMicrotask(() => setLocation(getLocation()))
    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const value = useMemo<SpaRouterContextValue>(() => ({
    ...location,
    navigate: (href: string) => {
      const nextUrl = new URL(href, window.location.origin)

      if (nextUrl.origin !== window.location.origin) {
        window.location.assign(nextUrl.href)
        return
      }

      window.history.pushState({}, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
      setLocation({ pathname: nextUrl.pathname, search: nextUrl.search })
    },
  }), [location])

  return <SpaRouterContext.Provider value={value}>{children}</SpaRouterContext.Provider>
}

export function useSpaLocation() {
  const context = useContext(SpaRouterContext)

  if (!context) throw new Error('useSpaLocation must be used inside SpaRouter')

  return context
}

type SpaLinkProps = React.ComponentProps<'a'>

export function SpaLink({ href, onClick, ...props }: SpaLinkProps) {
  const { navigate } = useSpaLocation()

  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        const target = event.currentTarget.target
        if (target && target !== '_self') return

        event.preventDefault()
        navigate(String(href))
      }}
    />
  )
}
