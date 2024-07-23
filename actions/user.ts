'use server'

import { User } from '@/models'
import { connectToDB } from '@/lib'

export async function createUser(id: string) {

	try {
		await connectToDB()
		const existingUser = await User.findOne({ id })

		if (existingUser) {
			console.log('User already exists')
			return existingUser
		}

		const newUser = new User({ id })
    
		await newUser.save()

		console.log('User created successfully')
        
		return newUser

	} catch (error) {

        console.error('Error creating user', error)
		throw new Error('Error creating user')

	}
}