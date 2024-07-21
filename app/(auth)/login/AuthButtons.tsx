'use client'

import { GoogleIcon, GitHubIcon } from '@/assets/icons'
import { signIn } from 'next-auth/react'

function AuthButtons() {
	return (
		<div className='flex gap-4 items-center w-max h-10'>
			<button onClick={() => signIn('google')} className='button-google'>
				<GoogleIcon /> Sign in with Google
			</button>

			<div className='h-5/6 w-px bg-blue opacity-50' />

			<button onClick={() => signIn('github')} className='button-github'>
				<GitHubIcon /> Sign in with GitHub
			</button>
		</div>
	)
}

export default AuthButtons
