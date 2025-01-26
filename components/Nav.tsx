'use client'
import { createNewEvent } from '@/actions/events_action'
import { Input } from '@nextui-org/react'
import { Button, Tooltip } from '@nextui-org/react'
import { CirclePlus } from 'lucide-react'
import { useTransition } from 'react'

const Nav = () => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      createNewEvent()
    })
  }
  return (
    <nav className="flex items-center gap-4 border-default-50 px-6 border-b h-[65px]">
      <div>
        <Tooltip content="Create Event">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            isLoading={isPending}
            onPress={handleClick}
          >
            <CirclePlus size={16} />
          </Button>
        </Tooltip>
      </div>
      <div className="w-1/2">
        <Input size="sm" variant="faded" placeholder="search" />
      </div>
    </nav>
  )
}

export default Nav
