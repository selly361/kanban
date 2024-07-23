import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	boards: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Board'
		}
	]
})

const User = models?.User || model('User', userSchema)

export default User
