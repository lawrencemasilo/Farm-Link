
import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import SuccessfulRegisteration from './pages/SuccessfulRegisteration'
import PasswordReset from './pages/PasswordReset'
import HomeFarmer from './pages/HomeFarmer'

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
        <Route path="/successfulregistration" element={<SuccessfulRegisteration />} />
        <Route path="/password/reset/:token" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
