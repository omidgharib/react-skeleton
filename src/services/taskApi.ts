import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/redux/stores/store'
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
      transformErrorResponse: (error: any) => {
        return { message: error.data.data }
      },
    }),
    create: builder.mutation<{ data: any }, TTask>({
      query: (arg: TTask) => ({
        method: 'POST',
        url: 'todos',
        body: arg,
      }),
      transformResponse: (result: { data: any }) => ({
        data: result.data,
      }),
      transformErrorResponse: (error: any) => ({ message: error.data.data }),
    }),
  }),
})

export default taskApi
