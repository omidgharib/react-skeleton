export interface ITask {
    key: string
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
