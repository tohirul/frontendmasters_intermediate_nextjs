'use client'
import dynamic from 'next/dynamic'

const ClientLoginForm = dynamic(() => import('@/components/SigninForm'), {
  ssr: false,
})

export default ClientLoginForm
