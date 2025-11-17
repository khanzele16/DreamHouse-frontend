import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/app/types/requests";

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://188.120.245.100/api" }),
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "/token/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<IRegisterResponse, IRegisterRequest>({
      query: (credentials) => ({
        url: "/users/register/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
