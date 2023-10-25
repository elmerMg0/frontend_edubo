
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './states/user.state'
export interface AppStore{
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice,
    }
})