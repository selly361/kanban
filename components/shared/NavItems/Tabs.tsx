'use client'

import { BoardIcon } from '@/assets/icons'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

interface Props {
	tabs: string[] | undefined
}

function Tabs({ tabs }: Props) {
	const pathname = decodeURIComponent(usePathname()).split('/')[1].toLowerCase()
	const allTabs = ['Home', ...(tabs || [])]

	return (
		<>
			{allTabs.map((tab) => (
				<Link
					key={tab}
					href={tab === 'Home' ? '/' : `/${tab}`}
					className={clsx(
						'button-tab',
						(tab === 'Home' && pathname === '') ||
							pathname === tab.toLowerCase()
							? 'bg-blue text-white'
							: 'hover:text-blue hover:bg-tabButtonHover'
					)}
				>
					<BoardIcon />
					{tab}
				</Link>
			))}
		</>
	)
}

export default Tabs
