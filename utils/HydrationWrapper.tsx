'use client'
import { ReactElement, useState, useEffect } from 'react'

export default function HydrationWrapper({
  children,
  fallback = null,
}: {
  children: ReactElement | ReactElement[]
  fallback?: ReactElement | null
}) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return fallback
  }

  return <>{children}</>
}
