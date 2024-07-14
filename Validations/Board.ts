import { z } from 'zod'

const SubTaskValidation = z
	.object({
		title: z
			.string()
			.trim()
			.min(1, 'Subtask title is required')
			.max(100, 'Subtask title must be less than 100 characters'),
		isCompleted: z.boolean()
	})
	.array()
	.refine(
		(subtasks) => {
			const titles = subtasks.map((subtask) => subtask.title)
			const uniqueTitles = new Set(titles)
			return titles.length === uniqueTitles.size
		},
		{
			message: 'Subtask titles must be unique'
		}
	)

const TaskValidation = z
	.object({
		title: z
			.string()
			.trim()
			.min(1, 'Task title is required')
			.max(20, 'Task title must be less than 20 characters'),
		description: z
			.string()
			.trim()
			.max(200, 'Description must be less than 200 characters')
			.optional(),
		status: z
			.string()
			.min(1, 'Status is required'),
		subtasks: SubTaskValidation
	})
	.array()
	.refine(
		(tasks) => {
			const titles = tasks.map((task) => task.title)
			const uniqueTitles = new Set(titles)
			return titles.length === uniqueTitles.size
		},
		{
			message: 'Task titles must be unique'
		}
	)

const ColumnValidation = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, 'Column name is required')
			.max(15, 'Column name must be less than 15 characters'),
		tasks: TaskValidation
	})
	.array()
	.refine(
		(columns) => {
			const names = columns.map((column) => column.name)
			const uniqueNames = new Set(names)
			return names.length === uniqueNames.size
		},
		{
			message: 'Column names must be unique'
		}
	)


const BoardValidation = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, 'Board name is required')
			.max(15, 'Board name must be less than 15 characters'),
		columns: ColumnValidation
	})
	.refine(
		(board) => {
			const columnNames = board.columns.map((column) => column.name)
			for (const column of board.columns) {
				for (const task of column.tasks) {
					if (!columnNames.includes(task.status)) {
						return false
					}
				}
			}
			return true
		},
		{
			message: 'Task status must be a valid column name',
			path: ['columns']
		}
	)

export default BoardValidation