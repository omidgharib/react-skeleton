import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IChoice,
  IField,
  IListApiResponse,
  IListOptionsResponse,
  IListQueryResponse,
  ISelectListResponse,
} from '@/types/common'
import { RootState } from '@/redux/stores/store'
interface IListQueryArgs {
  url: string
  limit: number
  offset: number
  search?: string
}

function listApi<RecordType>() {
  return createApi({
    reducerPath: 'lists',
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
    tagTypes: ['LISTS'],
    endpoints: (builder) => ({
      getList: builder.query<IListQueryResponse<RecordType>, IListQueryArgs>({
        query: ({ url, limit, offset, search }) => ({
          url: url,
          params: {
            limit,
            offset,
            search: search || undefined,
          },
        }),
        providesTags: (_1, _2, { url, limit, offset }) => [
          {
            type: 'LISTS',
            id: `${url.replace(/\//g, '-')}-${limit}-${offset}}`,
          },
          { type: 'LISTS', id: `${url.replace(/\//g, '-')}` },
        ],
        transformResponse: (
          baseQueryReturnValue: IListApiResponse<RecordType>
        ): IListQueryResponse<RecordType> => {
          return {
            dataSource: baseQueryReturnValue.results,
            totalRecords: baseQueryReturnValue.count,
          }
        },
      }),
      getMetadata: builder.query<IField[], { url: string }>({
        query: ({ url }) => ({
          url: url,
          method: 'OPTIONS',
        }),
        transformResponse: (baseQueryReturnValue: IListOptionsResponse) => {
          return baseQueryReturnValue.fields
        },
      }),
      getSelectList: builder.query<IChoice[], { url: string }>({
        query: ({ url }) => ({ url: url }),
        transformResponse: (baseQueryReturnValue: ISelectListResponse) =>
          baseQueryReturnValue.results,
      }),
    }),
  })
}

export default listApi
