import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    isAuth: boolean
}

const initialState: IState = {
    isAuth: false
}

const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    }
})

export const {
    setAuth
} = authSlice.actions
export default authSlice.reducer