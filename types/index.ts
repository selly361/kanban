import { BoardValidation } from '@/validations'
import { z } from 'zod'

/* Animation Types */

export type AnimationType = 'sidebar' | 'modal' | 'main'

/* Board Types */

export interface ISubtask {
	title: string
	isCompleted: boolean
}

export interface ITask {
	id: string
	title: string
	description?: string
	status: string
	subtasks?: ISubtask[]
}

export interface IColumn {
	name: string
	tasks?: ITask[]
}

export interface IBoard {
	name: string
	columns?: IColumn[]
}

/* Modal Type */

export type Modal =
	| 'deleteTask'
	| 'deleteBoard'
	| 'addBoard'
	| 'editBoard'
	| 'viewTask'
	| 'editTask'
	| 'newTask'
	| null

 /* Form Values Type */

export type FormValues = z.infer<typeof BoardValidation>
