import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "@/store/usersSlice";

const rootReducer = combineReducers({
    authSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']