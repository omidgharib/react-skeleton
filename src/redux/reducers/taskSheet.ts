import { ITaskMonthSheet } from '../../interfaces/ITaskMonthSheet'
const inititalState: ITaskMonthSheet[] = []
const taskSheetReducer = (state: ITaskMonthSheet[] = inititalState, action) => {
    console.log('taskSheetReducer', state, action)
    switch (action.type) {
        case 'addTaskSheet': {
            return [...state, action.payload]
        }
        case 'updateTaskSheet': {
            return action.payload
        }
    }
    return state
}
export default taskSheetReducer
