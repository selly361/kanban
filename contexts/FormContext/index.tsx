'use client'

import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BoardValidation } from '@/validations'
import * as actions from '@/actions'
import * as Types from '@/types'
import { useParams } from 'next/navigation'
import { FormContextType } from './FormContext.types'

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = (): FormContextType => {
	const context = useContext(FormContext)
	if (!context) {
		throw new Error('useFormContext must be used within a FormProvider')
	}
	return context
}

export const FormProvider = ({ children }: PropsWithChildren) => {
	const boardName = decodeURIComponent(useParams().board as string)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const formMethods = useForm<Types.FormValues>({
		mode: 'onSubmit',
		resolver: zodResolver(BoardValidation)
	})

	const createTask = async (columnName: string, taskData: Types.Task) => {
		setLoading(true)
		try {
			const task = await actions.createTask(
				boardName as string,
				columnName,
				taskData
			)
			formMethods.reset()
			return task
		} catch (error) {
			console.error('Error creating task:', error)
			setError('Could not create task')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const deleteTask = async (columnName: string, taskId: string) => {
		setLoading(true)
		try {
			await actions.deleteTask(boardName as string, columnName, taskId)
		} catch (error) {
			console.error('Error deleting task:', error)
			setError('Could not delete task')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const editTask = async (
		columnName: string,
		taskId: string,
		updatedTaskData: Types.Task
	) => {
		setLoading(true)

		try {
			const task = await actions.editTask(
				boardName as string,
				columnName,
				taskId,
				updatedTaskData
			)
			return task
		} catch (error) {
			console.error('Error editing task:', error)

			setError('Could not edit task')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const addBoard = async (boardData: Types.Board) => {
		setLoading(true)
		try {
			const board = await actions.addBoard(boardData)
			return board
		} catch (error) {
			console.error('Error adding board:', error)
			setError('Could not add board')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const editBoard = async (updatedBoardData: Types.Board) => {
		setLoading(true)
		try {
			const board = await actions.editBoard(
				boardName as string,
				updatedBoardData
			)
			return board
		} catch (error) {
			console.error('Error editing board:', error)
			setError('Could not edit board')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const deleteBoard = async () => {
		setLoading(true)
		try {
			await actions.deleteBoard(boardName as string)
		} catch (error) {
			console.error('Error deleting board:', error)
			setError('Could not delete board')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const addColumn = async (columnData: Types.Column) => {
		setLoading(true)
		try {
			const column = await actions.addColumn(boardName as string, columnData)
			return column
		} catch (error) {
			console.error('Error adding column:', error)
			setError('Could not add column')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const editColumn = async (
		columnName: string,
		updatedColumnData: Types.Column
	) => {
		setLoading(true)
		try {
			const column = await actions.editColumn(
				boardName as string,
				columnName,
				updatedColumnData
			)
			return column
		} catch (error) {
			console.error('Error editing column:', error)
			setError('Could not edit column')
			throw error
		} finally {
			setLoading(false)
		}
	}

	const deleteColumn = async (columnName: string) => {
		setLoading(true)
		try {
			await actions.deleteColumn(boardName as string, columnName)
		} catch (error) {
			console.error('Error deleting column:', error)
			setError('Could not delete column')
			throw error
		} finally {
			setLoading(false)
		}
	}

	return (
		<FormContext.Provider
			value={{
				...formMethods,
				createTask,
				deleteTask,
				editTask,
				addBoard,
				editBoard,
				deleteBoard,
				addColumn,
				editColumn,
				deleteColumn,
				loading,
				error
			}}
		>
			{children}
		</FormContext.Provider>
	)
}
