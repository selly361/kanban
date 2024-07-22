/* Animation Types */

export type AnimationType = 'sidebar' | 'modal' | 'main'

/* Board Types */

export interface Subtask {
	title: string
	isCompleted: boolean
}

export interface Task {
	title: string
	description: string
	status: string
	subtasks: Subtask[]
}

export interface Column {
	name: string
	tasks: Task[]
}

export interface Board {
	name: string
	columns: Column[]
}