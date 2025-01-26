import { getOneEvent } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import { redirect } from 'next/navigation'

const EventPage = async ({ params }: { params: { id: string } }) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
    return null
  }
  const { id } = await params
  const event = await getOneEvent(user.id, id)

  if (!event) redirect('/dashboard/events')

  return <div>{event.name}</div>
}

export default EventPage
