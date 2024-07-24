import { UseFormReturn } from 'react-hook-form'
import { Task, Column, Board, FormValues } from '@/types'

export interface FormContextType extends UseFormReturn<FormValues> {
	createTask: (columnName: string, taskData: Task) => Promise<Task>
	deleteTask: (columnName: string, taskId: string) => Promise<void>
	editTask: (
		columnName: string,
		taskId: string,
		updatedTaskData: Task
	) => Promise<Task>
	addBoard: (boardData: Board) => Promise<Board>
	editBoard: (updatedBoardData: Board) => Promise<Board | null>
	deleteBoard: () => Promise<void>
	addColumn: (columnData: Column) => Promise<Column | undefined>
	editColumn: (
		columnName: string,
		updatedColumnData: Column
	) => Promise<Column | undefined>
	deleteColumn: (columnName: string) => Promise<void>
	loading: boolean
	error: string | null
}
