import { getEventsForDashboard } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

const statusColors: {
  [key: string]:
    | 'warning'
    | 'success'
    | 'primary'
    | 'danger'
    | 'default'
    | 'secondary'
    | undefined
} = {
  draft: 'warning',
  live: 'success',
  started: 'primary',
  ended: 'default',
  canceled: 'danger',
  default: 'default',
}

async function EventSlot() {
  const user = await getCurrentUser()
  if (!user) return null
  // Logic to render event slots based on user's role and permissions
  const events = await getEventsForDashboard(user.id)
  return (
    <div className="flex justify-center p-4 w-full h-full">
      <div className="w-full">
        <h2 className="text-center text-xl">{`Latest Events`}</h2>
        <div className="border-default-100 my-8 border rounded-md">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex gap-2 border-default-100 p-2 border-b"
            >
              <Link href={`/dashboard/events/${event.id}`}>
                <span>{event.name}</span>
              </Link>
              <span>
                <Chip size="sm" color={statusColors[event.status]}>
                  {event.status}
                </Chip>
              </span>
              <span>
                <Chip size="sm" variant="faded">
                  {event.name}
                </Chip>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventSlot
