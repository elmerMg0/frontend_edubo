
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './states/user.state'
import { User } from '../models/User'
export interface AppStore{
    user: User,
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice,
    }
})