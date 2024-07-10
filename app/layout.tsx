import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { PropsWithChildren } from 'react'
import clsx from 'clsx'

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={clsx(plus_Jakarta_Sans)}
			>
				{children}
			</body>
		</html>
	)
}
