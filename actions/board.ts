'use server'

import { Board, User } from '@/models'
import { IBoard, IColumn, ITask } from '@/types'
import {
	BoardValidation,
	ColumnValidation,
	TaskValidation
} from '@/validations'
import { revalidatePath } from 'next/cache'
import { getSessionUserId } from '@/utils'
import { connectToDB } from '@/lib'

const revalidateBoardPath = (boardName: string) =>
	revalidatePath(`/${boardName}`)

type ValidSchemas =
	| typeof ColumnValidation
	| typeof BoardValidation
	| typeof TaskValidation

const handleValidation = async (
	schema: ValidSchemas,
	data: IBoard | IColumn | ITask
) => {
	const result = await schema.safeParseAsync(data)
	if (!result.success) {
		const errorMessages = result.error.errors.map((e) => e.message).join(', ')
		throw new Error(`Validation error: ${errorMessages}`)
	}
}

export async function createTask(
	boardName: string,
	columnName: string,
	taskData: ITask
) {
	try {
		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: IColumn) => col.name === columnName)
		if (!column) throw new Error('Column not found')

		await handleValidation(TaskValidation, taskData)

		column.tasks.push(taskData)
		await board.save()

		revalidateBoardPath(boardName)

		return column.tasks[column.tasks.length - 1]
	} catch (error) {
		console.error('Error creating task:', error)
		throw new Error('Could not create task')
	}
}

export async function deleteTask(
	boardName: string,
	columnName: string,
	taskId: string
) {
	try {
		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: IColumn) => col.name === columnName)
		if (!column) throw new Error('Column not found')

		column.tasks.id(taskId).remove()
		await board.save()

		revalidateBoardPath(boardName)

		return taskId
	} catch (error) {
		console.error('Error deleting task:', error)
		throw new Error('Could not delete task')
	}
}

export async function editTask(
	boardName: string,
	columnName: string,
	taskId: string,
	updatedTaskData: ITask
) {
	try {
		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: IColumn) => col.name === columnName)
		if (!column) throw new Error('Column not found')

		await handleValidation(TaskValidation, updatedTaskData)

		const task = column.tasks.id(taskId)
		Object.assign(task, updatedTaskData)

		await board.save()

		revalidateBoardPath(boardName)

		return task
	} catch (error) {
		console.error('Error editing task:', error)
		throw new Error('Could not edit task')
	}
}

export async function addBoard(boardData: IBoard): Promise<IBoard> {
	try {
		await connectToDB()

		await handleValidation(BoardValidation, boardData)

		const id = await getSessionUserId()

		const board = new Board(boardData)
		await board.save()

		await User.findOneAndUpdate(
			{ id },
			{ $addToSet: { boards: board._id } },
			{ upsert: true }
		)

		revalidateBoardPath(boardData.name)

		return board
	} catch (error) {
		console.error('Error adding board:', error)
		throw new Error('Could not add board')
	}
}

export async function editBoard(
	boardName: string,
	updatedBoardData: IBoard
): Promise<IBoard | null> {
	try {
		await connectToDB()

		await handleValidation(BoardValidation, updatedBoardData)

		const board = await Board.findOneAndUpdate(
			{ name: boardName },
			updatedBoardData,
			{ new: true }
		)

		if (board) revalidateBoardPath(boardName)

		return board
	} catch (error) {
		console.error('Error editing board:', error)
		throw new Error('Could not edit board')
	}
}

export async function deleteBoard(boardName: string): Promise<string> {
	try {
		await connectToDB()

		await Board.findOneAndDelete({ name: boardName })

		revalidateBoardPath(boardName)

		return boardName
	} catch (error) {
		console.error('Error deleting board:', error)
		throw new Error('Could not delete board')
	}
}

export async function addColumn(boardName: string, columnData: IColumn) {
	try {
		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const validatedColumnData = await handleValidation(
			ColumnValidation,
			columnData
		)

		board.columns.push(validatedColumnData)
		await board.save()

		revalidateBoardPath(boardName)

		return board.columns[board.columns.length - 1]
	} catch (error) {
		console.error('Error adding column:', error)
		throw new Error('Could not add column')
	}
}

export async function editColumn(
	boardName: string,
	columnName: string,
	updatedColumnData: IColumn
) {
	try {
		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: IColumn) => col.name === columnName)
		if (!column) throw new Error('Column not found')

		const validatedColumnData = await handleValidation(
			ColumnValidation,
			updatedColumnData
		)

		Object.assign(column, validatedColumnData)
		await board.save()

		revalidateBoardPath(boardName)

		return column
	} catch (error) {
		console.error('Error editing column:', error)
		throw new Error('Could not edit column')
	}
}

export async function deleteColumn(boardName: string, columnName: string) {
	try {
		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		board.columns.id(columnName).remove()
		await board.save()

		revalidateBoardPath(boardName)

		return columnName
	} catch (error) {
		console.error('Error deleting column:', error)
		throw new Error('Could not delete column')
	}
}

export async function fetchBoard(id: string, name: string): Promise<IBoard> {
	try {
		await connectToDB()

		const board = await Board.findOne({ id, name })
		return board
	} catch (error) {
		console.error('Error fetching board:', error)
		throw new Error('Could not fetch board')
	}
}

export async function fetchBoards(): Promise<IBoard[]> {
	try {
		await connectToDB()

		const id = await getSessionUserId()

		const { boards } = await User.findOne({ id }).populate('boards')

		return boards
	} catch (error) {
		console.error('Error fetching boards:', error)
		throw new Error('Could not fetch boards')
	}
}

export async function fetchBoardNames(): Promise<string[]> {
	try {
		const userId = await getSessionUserId()

		await connectToDB()

		const user = await User.findOne({ id: userId })
			.populate('boards', 'name')
			.exec()

		if (!user || !user.boards) {
			throw new Error('User or boards not found')
		}

		const boardNames = user.boards.map((board: IBoard) => board.name)

		return boardNames
	} catch (error) {
		console.error('Error fetching board names:', error)
		throw new Error('Could not fetch board names')
	}
}


export async function isBoardNameUnique(name: string) {
	'use server'
	try {
		const existingBoard = await Board.findOne({ name })

		console.log(existingBoard)

		return !existingBoard
	} catch (error) {
		console.error('Error checking board name uniqueness:', error)
		throw new Error('Could not verify board name uniqueness')
	}
}