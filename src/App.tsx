import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './styles/global.css'
import { Landing } from './pages/landing/Landing';
import { Home } from './pages/home/Home';
import { PrivateRoutes } from './models/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {

  return (
    <GoogleOAuthProvider clientId='872507899630-q445df1c11hgjh6i5o8rbl9l64lqbqdv.apps.googleusercontent.com'>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path={PrivateRoutes.HOME} element={<Home/>}/>
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
