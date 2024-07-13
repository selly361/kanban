import { z } from 'zod'

const SubTaskValidation = z
	.object({
		title: z.string().min(1, 'Subtask title is required'),
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
		title: z.string().min(1, 'Task title is required'),
		description: z.string().optional(),
		status: z.string().min(1, 'Status is required'),
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
		name: z.string().min(1, 'Column name is required'),
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
		name: z.string().min(1, 'Board name is required'),
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