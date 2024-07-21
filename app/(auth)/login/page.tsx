import TaskManagementAnimation from './TaskManagementAnimation'
import AuthButtons from './AuthButtons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/constants'
import { redirect } from 'next/navigation'

async function page() {

	const session = await getServerSession(authOptions)

	if(session?.user) redirect('/')

	return (
		<main className='w-screen h-screen p-12 flex gap-24'>
			<div className='w-1/2'>
				<h1 className='text-heading-xl text-textPrimary'>
					Welcome to{' '}
					<span className='bg-textGradient bg-clip-text text-transparent text-[140px]'>
						Kanban
					</span>
				</h1>
				<p className='text-heading-xl mb-8'>
					A <span className='text-blue'>Task Management App</span> designed to
					keep your work organized and efficient.
				</p>
				<AuthButtons />
			</div>

			<TaskManagementAnimation />
		</main>
	)
}

export default page
