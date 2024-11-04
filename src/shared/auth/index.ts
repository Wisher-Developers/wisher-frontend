import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

import { AuthSlice } from "./types"

const initialState: AuthSlice = {
  token: Cookies.get("token"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

export default authSlice.reducer
