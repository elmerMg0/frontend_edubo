import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/Dashboard'
import Road from './components/road/Road';
import './styles/global.css'
import { PrivateRoutes } from './models/routes';
import { Course } from './components/course/Course';
import  Question  from './components/question/Question';
import { ClassComponent } from './components/classComponent/ClassComponent';
import { ResourceComponent } from './components/resource/Resource';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path={PrivateRoutes.ROAD} element={<Road/>}/>
        <Route path={PrivateRoutes.COURSE} element={<Course/>}/>
        <Route path={PrivateRoutes.CLASS} element={<ClassComponent/>}/>
        <Route path={PrivateRoutes.QUESTION} element={<Question/>}/>
        <Route path={PrivateRoutes.RESOURCE} element={<ResourceComponent/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
