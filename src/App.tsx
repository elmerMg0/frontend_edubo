import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from './models/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LearningPaths } from './components/LearningPaths/LearningPaths';
import 'react-loading-skeleton/dist/skeleton.css'
import { Suspense, lazy } from 'react';
import Simulation from './components/simulation/Simulation';
import SimulationCourses from './components/simulation/SimulationCourses';
import SimulationQuestions from './components/simulation/SimulationQuestions';
import Quizzes from './components/simulation/Quizzes';

const APIURLAUTH = import.meta.env.VITE_REACT_AUTH;
const Landing  = lazy(() => import('./pages/landing/Landing'))
const Course = lazy(() => import('./components/course/Course'))
const Faculty = lazy(() => import('./components/faculty/Path'))
const Subject = lazy(() => import('./components/subject/Subject'))
const Quiz = lazy(() => import('./components/quiz/Quiz'))
const Pricing = lazy(() => import('./components/enroll/Pricing'))
const Login = lazy(() => import('./pages/login/Login'))
const Payment = lazy(() => import('./components/payment/Payment'))
const CourseFInished = lazy(() => import('./components/courseFinished/CourseFInished'))
const User = lazy(() => import('./components/user/UserInfo'))
const PageNotFound = lazy(() => import('./pages/pageNotFound/PageNotFound'))
function App() {

  return (
    <GoogleOAuthProvider clientId={APIURLAUTH}>
      <Suspense fallback={<div></div>} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path={`${PrivateRoutes.RUTAS}`} element={<LearningPaths />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path`} element={<Faculty />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse`} element={<Course />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse/:idClass/quiz/:idSubject`} element={<Quiz />} />
          <Route path={`${PrivateRoutes.RUTAS}/:type/:idCourse/finish`} element={<CourseFInished />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse/:idClass/:idSubject`} element={<Subject />} />
          <Route path={`${PrivateRoutes.PLANES}/:type/:id`} element={<Pricing />} />
          <Route path={`${PrivateRoutes.PLANES}/:type/:id/pago`} element={<Payment />} />
          <Route path={`${PrivateRoutes.SIMULATION}`} element={<Simulation />} />
          <Route path={`${PrivateRoutes.SIMULATION}/:path`} element={<SimulationCourses />} />
          <Route path={`${PrivateRoutes.SIMULATION}/:path/:id`} element={<Quizzes />} />
          <Route path={`${PrivateRoutes.SIMULATION}/:path/:id/:idQuiz`} element={<SimulationQuestions />} />
          <Route path={`/:username`} element={<User />} />
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
      </Suspense>
    </GoogleOAuthProvider>
  )
}

export default App
