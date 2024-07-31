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
            message: 'Task ID must be unique',
            path: ['tasks']
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
    .superRefine((columns, ctx) => {
        if (!columns) return true

        const names = columns.map((column) => column.name.toLowerCase())
        const uniqueNames = new Set(names)

        if (names.length !== uniqueNames.size) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Column names must be unique',
                path: ['root', 'columns']
            })

            names.forEach((name, index) => {
                if (names.indexOf(name) !== index) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Column name must be unique',
                        path: [index, 'name']
                    })
                }
            })

            return false
        }
        return true
    })

export const BoardValidation = (currentBoardName: string) =>
    z
        .object({
            name: z
                .string()
                .trim()
                .min(1, 'Board name is required')
                .max(30, 'Board name must be less than 30 characters')
                .refine(
                    async (boardName) => {
                        // Allow the current board name when editing
                        if (boardName === currentBoardName) {
                            return true
                        }
                        return await isBoardNameUnique(boardName)
                    },
                    {
                        message: 'Board name is already taken'
                    }
                )
                .refine((boardName) => boardName.toLowerCase() !== 'home', {
                    message: `Board name can't be named 'Home'`
                }),
            columns: ColumnValidation
        })
        .refine(
            (board) => {
                if (!board.columns) return true

                const columnNames = board.columns.map((column) =>
                    column.name.toLowerCase()
                )

                for (const column of board.columns) {
                    for (const task of column.tasks || []) {
                        if (!columnNames.includes(task.status.toLowerCase())) {
                            return false
                        }
                    }
                }
                return true
            },
            {
                message: 'Task status must be a valid column name',
                path: ['columns', 'tasks']
            }
        )

export const resolver = (currentBoardName: string) => zodResolver(BoardValidation(currentBoardName))
