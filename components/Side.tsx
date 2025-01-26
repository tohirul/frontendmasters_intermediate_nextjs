'use client'

import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/images/pardy.png'
import { Button, cn } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

const links = [
  { route: '/dashboard', name: 'Home' },
  { route: '/dashboard/events', name: 'Events' },
  { route: '/dashboard/guests', name: 'Guests' },
  { route: '/dashboard/activity', name: 'Activity' },
  { route: '/dashboard/settings', name: 'Settings' },
]

const isActive = (path: string, route: string) => {
  if (route === '/dashboard') return path === route
  else return path.includes(route)
}

const Side = () => {
  const activeClass = 'bg-primary hover:bg-primary'
  const path = usePathname()
  return (
    <div className="relative px-3 w-full h-full">
      <div className="mb-12">
        <figure className="pt-4 w-[80px]">
          <Image src={Logo} alt="pardy" />
        </figure>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route}>
              <div
                className={cn(
                  `w-full h-full py-2 px-2 hover:bg-content1 rounded-lg `,
                  isActive(path, link?.route) && activeClass
                )}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="bottom-0 left-0 absolute px-4 w-full">
        <Button fullWidth variant="ghost">
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Side
