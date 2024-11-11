import { createAsyncThunk } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

import parseToken from "@shared/lib/parseToken"

export const TOKEN_COOKIE = "token"

const loadToken = createAsyncThunk<string, string>("auth/loadToken", token => {
  const { exp } = parseToken(token)

  Cookies.set(TOKEN_COOKIE, token, {
    expires: new Date(exp * 1000),
    path: "/",
  })

  return token
})

const removeToken = createAsyncThunk<void, void>("auth/removeToken", () => {
  Cookies.remove(TOKEN_COOKIE)

  window.location.href = "/"
})

export { loadToken, removeToken }
