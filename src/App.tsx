import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/Dashboard'
import Road from './components/road/Road';
import './styles/global.css'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='road' element={<Road/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
