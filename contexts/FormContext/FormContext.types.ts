import { UseFormReturn } from 'react-hook-form'
import { ITask, IColumn, IBoard, FormValues } from '@/types'

export interface FormContextType extends UseFormReturn<FormValues> {
	createTask: (columnName: string, taskData: ITask) => Promise<void>
	deleteTask: (columnName: string, taskId: string) => Promise<void>
	editTask: (columnName: string, taskId: string, updatedTaskData: ITask) => Promise<void>
	addBoard: (boardData: IBoard) => Promise<void>
	editBoard: (updatedBoardData: IBoard) => Promise<void>
	deleteBoard: () => Promise<void>
	addColumn: (columnData: IColumn) => Promise<void>
	editColumn: (columnName: string, updatedColumnData: IColumn) => Promise<void>
	deleteColumn: (columnName: string) => Promise<void>
	loading: boolean
}
