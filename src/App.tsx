import { BrowserRouter, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import { Dashboard } from './pages/dashboard/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
