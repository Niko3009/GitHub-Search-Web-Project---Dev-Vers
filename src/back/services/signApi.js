import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_API_URL = 'https://api.github.com'

const USES_TAG = { type: 'TRACKS', id: 'LIST' }

export const signApi = createApi({
    reducerPath: 'sign',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
    }),

    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ reqLogin, sorting, pageNum }) => {
                let params = { per_page: 10 }
                if (pageNum) params.page = pageNum
                if (sorting.on) {
                    params.sort = 'repositories'
                    params.order = sorting.ascending ? 'asc' : 'desc'
                }
                const url =
                    `search/users?q=${reqLogin}+in:login+type:user&` +
                    new URLSearchParams(params).toString()

                return {
                    url,
                    method: 'GET',
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28',
                    },
                }
            },
            providesTags: [USES_TAG],
        }),
    }),
})

export default signApi
export const { useGetAllUsersQuery } = signApi