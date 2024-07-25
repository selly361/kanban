'use client'

import { useModalContext } from '@/contexts'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

function Main({ children }: PropsWithChildren) {

    const { sidebarOpen } = useModalContext()

  return (
    <main className={clsx('main-container transition-all duration-700 ease-in-out', !sidebarOpen ? 'w-screen' : '')}>{children}</main>
  )
}

export default Main