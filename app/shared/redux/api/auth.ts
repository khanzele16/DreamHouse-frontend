import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/app/types/requests";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://188.120.245.100/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Notifications'],
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

export const authApi = apiSlice;
export const { useLoginMutation, useRegisterMutation } = apiSlice;
