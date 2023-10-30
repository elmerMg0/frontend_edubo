
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './states/user.state'
import roadSlice from './states/road.state'
import { User } from '../models/User'
import { Road } from '../models/models'
export interface AppStore{
    user: User,
    road: Road
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice,
        road: roadSlice
    }
})