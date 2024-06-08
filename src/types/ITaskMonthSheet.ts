import { ITask } from './ITask'

export interface ITaskDaySheet {
  date: string
  checked: boolean
}

export interface ITaskMonthSheet {
  task: ITask
  days: ITaskDaySheet[]
}
