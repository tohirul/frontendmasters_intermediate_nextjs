'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton({
  value,
  ...props
}: {
  value: string
  [key: string]: any
}): React.JSX.Element {
  const { pending } = useFormStatus()

  return (
    <Button {...props} isLoading={pending}>
      {value}
    </Button>
  )
}

export default SubmitButton
