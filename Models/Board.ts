import { Schema, model, models } from 'mongoose'

const SubtaskSchema = new Schema({
	title: {
		type: String,
		required: false
	},
	isCompleted: {
		type: Boolean,
		required: false
	}
})

const TaskSchema = new Schema({
	title: {
		type: String,
		required: false
	},
	description: {
		type: String,
		default: ''
	},
	status: {
		type: String,
		required: false
	},
	subtasks: [SubtaskSchema]
})

const ColumnSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	tasks: [TaskSchema]
})

const BoardSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	columns: [ColumnSchema]
})

export default models.Board || model('Board', BoardSchema)