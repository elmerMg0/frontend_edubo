
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './states/user.state'
import settingSlice from './states/settings.state'
import { User } from '../models/User'
export interface AppStore{
    user: User,
    settings: {
        repAutomatic: boolean
    }
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice,
        settings: settingSlice
    }
})