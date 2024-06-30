'use client'

import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react'
import { useForm } from 'react-hook-form'
import { resolver } from '@/validations'
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

	const formMethods = useForm<Types.FormValues>({
		mode: 'onSubmit',
		resolver
	})

	const createTask = async (columnName: string, taskData: Types.ITask) => {
		setLoading(true)
		await actions.createTask(boardName, columnName, taskData)
		formMethods.reset()
		setLoading(false)
	}

	const deleteTask = async (columnName: string, taskId: string) => {
		setLoading(true)
		await actions.deleteTask(boardName, columnName, taskId)
		setLoading(false)
	}

	const editTask = async (
		columnName: string,
		taskId: string,
		updatedTaskData: Types.ITask
	) => {
		setLoading(true)
		await actions.editTask(boardName, columnName, taskId, updatedTaskData)
		setLoading(false)
	}

	const addBoard = async (boardData: Types.IBoard) => {
		setLoading(true)
		await actions.addBoard(boardData)
		setLoading(false)
	}

	const editBoard = async (updatedBoardData: Types.IBoard) => {
		setLoading(true)
		await actions.editBoard(boardName, updatedBoardData)
		setLoading(false)
	}

	const deleteBoard = async () => {
		setLoading(true)
		await actions.deleteBoard(boardName)
		setLoading(false)
	}

	const addColumn = async (columnData: Types.IColumn) => {
		setLoading(true)
		await actions.addColumn(boardName, columnData)
		setLoading(false)
	}

	const editColumn = async (
		columnName: string,
		updatedColumnData: Types.IColumn
	) => {
		setLoading(true)
		await actions.editColumn(boardName, columnName, updatedColumnData)
		setLoading(false)
	}

	const deleteColumn = async (columnName: string) => {
		setLoading(true)
		await actions.deleteColumn(boardName, columnName)
		setLoading(false)
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
				loading
			}}
		>
			{children}
		</FormContext.Provider>
	)
}
