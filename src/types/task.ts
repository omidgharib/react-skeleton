import { z } from 'zod'

const TaskTypeValues = ['daily', 'weekly', 'monthly'] as const

export const taskSchema = z.object({
  key: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  date: z.string(),
  type: z.enum(TaskTypeValues),
  target: z.number(),
})

export const TaskDaySheet = z.object({
  date: z.string(),
  checked: z.boolean(),
})

export type TTask = z.infer<typeof taskSchema>
export type TTaskDaySheet = z.infer<typeof TaskDaySheet>
export type TTaskMonthSheet = {
  task: TTask
  days: TTaskDaySheet[]
}
