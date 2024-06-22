
import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import PasswordReset from './pages/PasswordReset'
import HomeFarmer from './pages/HomeFarmer'
import RecoveryEmail from './pages/RecoveryEmail'

function App() {
  //handles all the routing for the application.
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/farmer" element={<HomeFarmer />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<PasswordReset />} />
        <Route path="/recoveryemailsent" element={<RecoveryEmail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
