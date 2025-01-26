import { getRsvpsForDashboard } from '@/utils/rsvps'
import { getCurrentUser } from '@/utils/users'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

const statusColors: Record<
  string,
  | 'primary'
  | 'warning'
  | 'danger'
  | 'default'
  | 'secondary'
  | 'success'
  | undefined
> = {
  going: 'primary',
  maybe: 'warning',
  'not-going': 'danger',
  default: 'default',
}
const RSVPS = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  const data = await getRsvpsForDashboard(user.id)

  return (
    <div className="flex justify-center p-4 w-full h-full">
      <div className="w-full">
        <h2 className="text-center text-xl">{`RSVPs`}</h2>
        <div className="border-default-100 my-8 border rounded-md">
          {data.map(({ rsvps, events, attendees }) => (
            <div
              key={rsvps?.id}
              className="flex gap-2 border-default-100 p-2 border-b"
            >
              <span>{attendees?.name}</span>
              <span>
                <Chip
                  size="sm"
                  color={statusColors[rsvps?.status ?? 'default']}
                >
                  {rsvps?.status ?? 'Unknown'}
                </Chip>
              </span>
              <span>
                {events && (
                  <Link href={`/dashboard/events/${events?.id}`}>
                    <Chip size="sm" variant="faded">
                      {events?.name}
                    </Chip>
                  </Link>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RSVPS
