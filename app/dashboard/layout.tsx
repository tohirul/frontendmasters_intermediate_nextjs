'use client'
import Shell from '@/components/Shell'
import { events } from '@/db/schema'
import { usePathname } from 'next/navigation'

const Dashboard = ({
  children,
  events,
  rsvps,
}: {
  children: React.ReactNode
  events: React.ReactNode
  rsvps: React.ReactNode
}) => {
  const path = usePathname()

  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className="flex w-full h-full">
          <div className="border-default-50 border-r w-1/2">{rsvps}</div>
          <div className="flex flex-col w-1/2">
            <div className="border-default-50 border-b w-full h-1/2">
              {events}
            </div>
            <div className="w-full h-1/2">{children}</div>
          </div>
        </div>
      ) : (
        <div>
          <h1>{children}</h1>
        </div>
      )}
    </Shell>
  )
}

export default Dashboard
