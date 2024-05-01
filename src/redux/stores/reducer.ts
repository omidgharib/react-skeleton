import { combineReducers } from '@reduxjs/toolkit'
import { taskReducer, taskSheetReducer } from '@/redux/reducers'

const reducers = combineReducers({
    task: taskReducer,
    taskSheet: taskSheetReducer,
})

export default reducers
