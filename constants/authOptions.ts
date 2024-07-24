import { createUser } from '@/actions'
import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		})
	],

	callbacks: {
		session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.sub
				}
			}
		}
	},

	events: {
		async signIn({ user }) {
			try {
				await createUser(user.id)
			} catch (error) {
				console.error('Error during sign-in event', error)
			}
		}
	}
}
