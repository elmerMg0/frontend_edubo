import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './states/user'
const store = configureStore({
    reducer: {
        user: userSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispacth