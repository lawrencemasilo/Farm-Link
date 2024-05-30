import Footer from '../components/Footer'
import HeaderSignOut from '../components/HeaderSignOut'
import Hero from '../components/Hero'
import MidBit from '../components/MidBit'
import Services from '../components/Services'
import Team from '../components/Team'
import '../styles/HeaderSignOut.css'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <h1>FarmLink</h1>
        </div>
        <div className="wrapper">
          <div className="nav">
            <div className="home-link-container">
              <a href="#services">Services</a>
            </div>
            <div className="about_us-link-container">
              <a href="#aboutUs">About Us</a>
            </div>
          </div>
          <div className="login_register-btn-container">
            <div className="login-container">
              <button onClick={() => {navigate('/login')}}>Login</button>
            </div>
            <div className="register-container">
              <button onClick={() => {navigate('/register')}}>Register</button>
            </div>
          </div>
        </div>
      </div>
      {<Hero />}
      {<Services />}
      {<MidBit />}
      {<Team />}
      {<Footer />}
    </>
  )
}
