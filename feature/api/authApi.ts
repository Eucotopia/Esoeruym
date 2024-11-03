import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '@/app/store'
import { AuthUser } from '@/feature/auth/authSlice'
import { ResultResponse } from '@/types'

export type LoginCredentialsType = {
  email: string
  password: string
}

export const baseUrl = 'http://localhost:8080'
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/user`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const authorization = (getState() as RootState).auth.userDetail?.authorization

      if (authorization) {
        headers.set('Authorization', `Bearer ${authorization}`)
      }

      return headers
    },
  }),
  endpoints: builder => ({
    authenticateUser: builder.mutation<AuthUser, LoginCredentialsType>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ResultResponse<AuthUser>) => {
        if (response.code === 2002) {
          return response.data
        } else {
          alert(`Login failed: ${response.message}`)
          throw new Error(response.message)
        }
      },
    }),
  }),
})

export const { useAuthenticateUserMutation } = authApi
