import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginInfo, ILoginResponse } from '@/types/common'

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  tagTypes: ['AUTH'],
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, ILoginInfo>({
      query: (arg: ILoginInfo) => ({
        method: 'POST',
        url: 'login', //TODO: move to constants
        body: arg,
      }),
      transformResponse: (result: { data: ILoginResponse }) => ({
        token: result.data.access_token,
      }),
      transformErrorResponse: (error: any) => ({ message: error.data.data }),
    }),
  }),
})

export default authApi
