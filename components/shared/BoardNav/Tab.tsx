'use client'

import { BoardIcon } from '@/assets/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
	tab: string
}

function Tab({ tab }: Props) {
	const pathname = usePathname()

	return (
		<Link
			href={`/${tab}`}
			className={clsx(
				'button-tab',
				pathname.includes(tab)
					? 'bg-blue text-white'
					: 'hover:text-blue hover:bg-tabButtonHover'
			)}
		>
			<BoardIcon />
			{tab}
		</Link>
	)
}

export default Tab
