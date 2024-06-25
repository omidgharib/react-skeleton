import { combineReducers } from '@reduxjs/toolkit'
import { taskReducer, taskSheetReducer } from '@/redux/reducers'
import taskApi from '@/services/taskApi'

const reducers = combineReducers({
  task: taskReducer,
  taskSheet: taskSheetReducer,
  [taskApi.reducerPath]: taskApi.reducer,
})

export default reducers
