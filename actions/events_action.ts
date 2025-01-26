'use server'
import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { and, eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { memoize } from 'nextjs-better-unstable-cache'

export const createNewEvent = async () => {
  await delay()
  const user = await getCurrentUser()
  if (!user) return

  await db.insert(events).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })
  revalidateTag('dashboard:events')
  revalidateTag('events')
}
