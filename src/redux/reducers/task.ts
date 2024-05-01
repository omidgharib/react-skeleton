import { ITask } from '../../interfaces/ITask'
const inititalState: ITask[] = [
    {
        key: '1',
        title: 'title test',
        description: 'description test',
        completed: false,
    },
    {
        key: '2',
        title: 'title test 2',
        description: 'description test 2',
        completed: true,
    },
    {
        key: '3',
        title: 'title test 3',
        description: 'description test 3',
        completed: false,
    },
]
const taskReducer = (state: ITask[] = inititalState, action) => {
    switch (action.type) {
        case 'addTask': {
            return [...state, action.payload]
        }
        case 'updateTasks': {
            return action.payload
        }
    }
    return state
}
export default taskReducer

// import { createAction, createReducer } from '@reduxjs/toolkit'

// interface CounterState {
//   value: number
// }

// const increment = createAction('counter/increment')
// const decrement = createAction('counter/decrement')
// const incrementByAmount = createAction<number>('counter/incrementByAmount')

// const initialState = { value: 0 } satisfies CounterState as CounterState

// const counterReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(increment, (state, action) => {
//       state.value++
//     })
//     .addCase(decrement, (state, action) => {
//       state.value--
//     })
//     .addCase(incrementByAmount, (state, action) => {
//       state.value += action.payload
//     })
// })
