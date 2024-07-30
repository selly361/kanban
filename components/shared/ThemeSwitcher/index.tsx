'use client'

import { MoonIcon, SunIcon } from '@/assets/icons'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	  }, [])
	
	  if (!mounted) {
		return null
	  }

	return (
		<div className='bg-bodyBg flex gap-8 p-4 justify-center items-center rounded-md'>
			<MoonIcon />
			<button
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className='w-10 h-5 bg-blue rounded-full flex items-center p-1 cursor-pointer'
			>
				<div
					className={clsx(
						'h-3.5 w-3.5 bg-white rounded-full transition-margin duration-300 ease-in-out',
						theme === 'dark' ? 'mr-4' : 'ml-4'
					)}
				/>
			</button>
			<SunIcon />
		</div>
	)
}

export default ThemeSwitcher
