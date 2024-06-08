import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import taskReducer from "./reducers/task";
// import taskSheetReducer from "./reducers/taskSheet";
import reducers from './reducer'

const persistConfig = {
  key: 'root',
  storage: storage,
  // blacklist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)

// const store = createStore(persistedReducer);
const store = configureStore({
  reducer: persistedReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export default () => {
//   let persistor = persistStore(store);
//   return { store, persistor };
// };

export default store
