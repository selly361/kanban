'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Props {
	className?: string
}

function Logo({ className }: Props) {
	const [mounted, setMounted] = useState(false)
	const { theme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Image
			width={153}
			height={26}
			alt='logo'
			src={`/logo-${theme}.svg`}
			className={className}
		/>
	)
}

export default Logo
