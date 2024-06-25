export interface ITask {
  id: string
  title?: string
  description?: string
  completed?: boolean
  date?: string
  type?: 'daily' | 'weekly' | 'monthly'
  // daily?: boolean;
  // weekly?: boolean;
  // monthly?: boolean;
  target?: number
}
