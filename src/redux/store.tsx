
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './states/user.state'
import roadSlice from './states/road.state'
import classSlice from './states/class.state'
import courseSlice from './states/course.state'
import { User } from '../models/User'
import { Class, Course, Road } from '../models/models'
export interface AppStore{
    user: User,
    road: Road
    class: Class,
    course: Course
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice,
        road: roadSlice,
        class: classSlice,
        course: courseSlice
    }
})