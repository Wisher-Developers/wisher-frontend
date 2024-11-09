import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

import { TOKEN_COOKIE, loadToken, removeToken } from "./token"
import { AuthSlice } from "./types"

const initialState: AuthSlice = {
  token: Cookies.get(TOKEN_COOKIE),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadToken.fulfilled, (state, { payload }) => {
      state.token = payload
    })

    builder.addCase(removeToken.fulfilled, state => {
      state.token = undefined
    })
  },
  selectors: {
    selectIsLoggedIn: state => !!state.token,
  },
})

export default authSlice.reducer

export const { selectIsLoggedIn } = authSlice.selectors
