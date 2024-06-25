import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { RootState } from '@/redux/stores/store'
import { TTask } from '@/types/task'

const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).user.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['taskApi'],
  endpoints: (builder) => ({
    getTasks: builder.query<TTask[], void>({
      query: () => ({
        method: 'GET',
        url: `todos`,
      }),
      transformResponse: (baseQueryReturnValue: TTask[]) =>
        baseQueryReturnValue,
      transformErrorResponse: (error: unknown) => ({ error: error }),
    }),
    create: builder.mutation<{ data: TTask }, TTask>({
      query: (arg: TTask) => ({
        method: 'POST',
        url: 'todos',
        body: arg,
      }),
      transformResponse: (result: { data: TTask }) => ({
        data: result.data,
      }),
      transformErrorResponse: (error: unknown) => ({ error: error }),
    }),
  }),
})

export default taskApi
