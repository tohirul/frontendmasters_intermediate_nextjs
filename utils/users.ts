import 'server-only'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from './constants'
import { redirect } from 'next/navigation'
import { getUserFromToken } from './authTools'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  console.log('Getting User from Token')
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)
  if (!token) redirect('/signin')
  const user = await getUserFromToken(token)

  return user
})
