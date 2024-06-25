import {
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import taskReducer from "./reducers/task";
// import taskSheetReducer from "./reducers/taskSheet";
import reducers from './reducer'
import taskApi from '@/services/taskApi'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['taskApi'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn('An Error occur while running RTK query', action)
      // if (action.payload.status === 403) api.dispatch(logout());
      console.log(api)
    }

    return next(action)
  }

// const store = createStore(persistedReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      // listApi().middleware,
      taskApi.middleware,
      rtkQueryErrorLogger
    )
  },
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
