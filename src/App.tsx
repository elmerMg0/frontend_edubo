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
const APIURLAUTH = import.meta.env.VITE_REACT_AUTH;
function App() {

  return (
    <GoogleOAuthProvider clientId={APIURLAUTH}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path={`${PrivateRoutes.RUTAS}`} element={<LearningPaths />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path`} element={<Faculty />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse`} element={<Course />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse/:idClass/quiz/:idSubject`} element={<Quiz />} />
          <Route path={`${PrivateRoutes.RUTAS}/:path/:idCourse/:idClass/:idSubject`} element={<Subject />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
