import { isBoardNameUnique } from '@/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'


export const SubTaskValidation = z
	.array(
		z.object({
			title: z
				.string()
				.trim()
				.min(1, 'Subtask title is required')
				.max(100, 'Subtask title must be less than 100 characters'),
			isCompleted: z.boolean()
		})
	)
	.optional()

export const TaskValidation = z
	.object({
		id: z.string().trim().length(7, 'Task ID must be exactly 7 characters'),
		title: z
			.string()
			.trim()
			.min(1, 'Task title is required')
			.max(100, 'Task title must be less than 100 characters'),
		description: z
			.string()
			.trim()
			.max(200, 'Description must be less than 200 characters')
			.optional(),
		status: z.string().min(1, 'Status is required'),
		subtasks: SubTaskValidation
	})
	.array()
	.optional()
	.refine(
		(tasks) => {
			if (!tasks) return true

			const ids = tasks.map((task) => task.id)
			const uniqueIds = new Set(ids)
			return ids.length === uniqueIds.size
		},
		{
			message: 'Task id must be unique'
		}
	)

export const ColumnValidation = z
	.array(
		z.object({
			name: z
				.string()
				.trim()
				.min(1, 'Column name is required')
				.max(15, 'Column name must be less than 15 characters'),
			tasks: TaskValidation
		})
	)
	.optional()
	.refine(
		(columns) => {
			if (!columns) return true
			const names = columns.map((column) => column.name)
			const uniqueNames = new Set(names)
			return names.length === uniqueNames.size
		},
		{ message: 'Column names must be unique' }
	)

export const BoardValidation = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, 'Board name is required')
			.max(30, 'Board name must be less than 15 characters')
			.refine(async (boardName) => await isBoardNameUnique(boardName), {
				message: 'Board names already taken'
			}),
		columns: ColumnValidation
	})
	.refine(
		(board) => {
			if (!board.columns) return true

			const columnNames = board.columns.map((column) => column.name)

			for (const column of board.columns) {
				for (const task of column.tasks || []) {
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

export const resolver = zodResolver(BoardValidation)
