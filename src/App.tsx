import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/Dashboard'
import Road from './components/road/Road';
import './styles/global.css'
import { PrivateRoutes } from './models/routes';
import { Course } from './components/course/Course';
import  Question  from './components/question/Question';
import { ClassComponent } from './components/classComponent/ClassComponent';
import { ResourceComponent } from './components/resource/Resource';
import { Header } from './pages/header/Header';
import { Landing } from './pages/landing/Landing';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {

  return (
    <GoogleOAuthProvider clientId='872507899630-q445df1c11hgjh6i5o8rbl9l64lqbqdv.apps.googleusercontent.com'>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Landing/>}/>
    </Routes>
   {/*  <Header>
      <Routes>
        <Route path={PrivateRoutes.ROAD} element={<Road/>}/>
        <Route path={PrivateRoutes.COURSE} element={<Course/>}/>
        <Route path={PrivateRoutes.CLASS} element={<ClassComponent/>}/>
        <Route path={PrivateRoutes.QUESTION} element={<Question/>}/>
        <Route path={PrivateRoutes.RESOURCE} element={<ResourceComponent/>}/>
      </Routes>
    </Header> */}
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
