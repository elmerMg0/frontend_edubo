import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/Dashboard'
import Road from './components/road/Road';
import './styles/global.css'
import { PrivateRoutes } from './models/routes';
import { Course } from './components/course/Course';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path={PrivateRoutes.ROAD} element={<Road/>}/>
        <Route path={PrivateRoutes.COURSE} element={<Course/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
