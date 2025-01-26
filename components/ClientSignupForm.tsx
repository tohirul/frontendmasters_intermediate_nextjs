'use client'
import dynamic from 'next/dynamic'

const ClientSignupForm = dynamic(() => import('@/components/SignupForm'), {
  ssr: false,
})

export default ClientSignupForm
