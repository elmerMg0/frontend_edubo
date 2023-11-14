import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './styles/global.css'
import { Landing } from './pages/landing/Landing';
import { Home } from './pages/home/Home';
import { PrivateRoutes } from './models/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Course } from './components/course/Course';
import { Subject } from './pages/subject/Subject';
import { Path } from './pages/path/Path';
function App() {

  return (
    <GoogleOAuthProvider clientId='872507899630-q445df1c11hgjh6i5o8rbl9l64lqbqdv.apps.googleusercontent.com'>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path={`${PrivateRoutes.RUTAS}`} element={<Home/>}/>
        <Route path={`${PrivateRoutes.RUTAS}/:path`} element={<Path/>}/>
        <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse`} element={<Course/>}/>
        <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse/:idClass/:idSubject`} element={<Subject/>}/>
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
