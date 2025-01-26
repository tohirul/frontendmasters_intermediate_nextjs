import { getAttendeesCountForDashboard } from '@/utils/attendees'
import { getCurrentUser } from '@/utils/users'
import { user } from '@nextui-org/react'

const Home = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }
  const data = await getAttendeesCountForDashboard(user.id)
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div>
        <h4 className="text-lg">Attendees</h4>
        <h2 className="my-8 font-semibold text-6xl text-center">{data}</h2>
      </div>
    </div>
  )
}

export default Home
