'use server'

import { Board, User } from '@/models'
import { Column, Task, Board as IBoard } from '@/types'
import {
	BoardValidation,
	ColumnValidation,
	TaskValidation
} from '@/validations'
import { revalidatePath } from 'next/cache'
import { getSessionUserId, isBoardNameUnique } from './helpers'
import { connectToDB } from '@/lib'

const revalidateBoardPath = (boardName: string) => {
	revalidatePath(`/${boardName}`)
}

export async function createTask(
	boardName: string,
	columnName: string,
	taskData: Task
): Promise<Task> {
	try {

		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: Column) => col.name === columnName)
		if (!column) throw new Error('Column not found')

		const { success } = await TaskValidation.safeParseAsync(taskData)

		if (!success) {
			throw new Error('Invalid task data')
		}

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
): Promise<string> {
	try {

		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: Column) => col.name === columnName)
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
	updatedTaskData: Task
): Promise<Task> {
	try {

		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: Column) => col.name === columnName)
		if (!column) throw new Error('Column not found')

		const { success } = await TaskValidation.safeParseAsync(updatedTaskData)

		if (!success) {
			throw new Error('Invalid task data')
		}

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

		const [{ success, error }, uniqueBoardName, userId] = await Promise.all([
			BoardValidation.safeParseAsync(boardData),
			isBoardNameUnique(boardData.name),
			await getSessionUserId()
		])

		console.log(error)

		if (!success) throw new Error('Invalid Board data')

		if (!uniqueBoardName) throw new Error('Board name is not unique')

		const board = new Board(boardData)
		await board.save()

		await User.findOneAndUpdate(
			{ userId },
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

		const { success } = await BoardValidation.safeParseAsync(updatedBoardData)

		if (!success) throw new Error('Invalid Board data')

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

export async function addColumn(
	boardName: string,
	columnData: Column
): Promise<Column | undefined> {
	try {

		await connectToDB()

		const board = await Board.findOne({ name: boardName })

		if (!board) throw new Error('Board not found')

		const { success } = await ColumnValidation.safeParseAsync(columnData)

		if (!success) {
			throw new Error('Invalid column data')
		}

		board.columns.push(columnData)

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
	updatedColumnData: Column
): Promise<Column | undefined> {
	try {

		await connectToDB()

		const board = await Board.findOne({ name: boardName })
		if (!board) throw new Error('Board not found')

		const column = board.columns.find((col: Column) => col.name === columnName)

		if (!column) throw new Error('Column not found')

		const { success } = await ColumnValidation.safeParseAsync(updatedColumnData)

		if (!success) {
			throw new Error('Invalid column data')
		}

		Object.assign(column, updatedColumnData)
		await board.save()

		revalidateBoardPath(boardName)

		return column
	} catch (error) {
		console.error('Error editing column:', error)
		throw new Error('Could not edit column')
	}
}

export async function deleteColumn(
	boardName: string,
	columnName: string
): Promise<string> {
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

export async function fetchBoards(id: string, name: string): Promise<IBoard[]> {
	try {

		await connectToDB()

		const boards = await Board.find({ id, name })
		return boards
	} catch (error) {
		console.error('Error fetching boards:', error)
		throw new Error('Could not fetch boards')
	}
}

export async function fetchBoardNames(userId: string): Promise<string[]> {
	try {

		await connectToDB()

		const boards = await Board.find({ user: userId }).select('name').lean()
		return boards.map((board) => board.name)
	} catch (error) {
		console.error('Error fetching boards:', error)
		throw new Error('Could not fetch boards')
	}
}
