import { authOptions } from '@/constants'
import { getServerSession } from 'next-auth'

export const getSessionUserId = async () => {
	const session = await getServerSession(authOptions)
	if (!session?.user?.id) {
		console.error('Session or user ID not found')
		throw new Error('Not authenticated')
	}
	return session.user.id
}