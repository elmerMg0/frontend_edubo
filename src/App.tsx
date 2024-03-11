import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './styles/global.css'
import { Landing } from './pages/landing/Landing';
import { PrivateRoutes } from './models/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Course } from './components/course/Course';
import { LearningPaths } from './components/LearningPaths/LearningPaths';
import { Faculty } from './components/faculty/Path';
import { Subject } from './components/subject/Subject';
import 'react-loading-skeleton/dist/skeleton.css'
import Quiz from './components/quiz/Quiz';
import Pricing from './components/enroll/Pricing';
import Login from './pages/login/Login';
import Payment from './components/payment/Payment';
const APIURLAUTH = import.meta.env.VITE_REACT_AUTH;
function App() {

  return (
    <GoogleOAuthProvider clientId={APIURLAUTH}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path={`${PrivateRoutes.RUTAS}`} element={<LearningPaths />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path`} element={<Faculty />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse`} element={<Course />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse/:idClass/quiz/:idSubject`} element={<Quiz />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse/:idClass/:idSubject`} element={<Subject />} />
          <Route path={`${PrivateRoutes.PLANES}/:type/:id`} element={<Pricing />} />
          <Route path={`${PrivateRoutes.PLANES}/:type/:id/pago`} element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
