import { useNavigate } from 'react-router-dom'
import '../styles/HeaderSignIn.css'

export default function HeaderSignIn() {
  const navigate = useNavigate();

  return (
    <div className="header_signin-container">
      <div className="logo_signin-container">
        <h1>FarmLink</h1>
      </div>
      <div className="header-nav">
        <div className="home-search-container">
          <input type="text" />
        </div>
      </div>
      <div className="signin-wrapper">
        <div className="logout-btn-container">
          <div className="setting-container">
            
          </div>
          <div className="profile-container">
            
          </div>
          <div className="logout-container">
            <button onClick={() => {navigate('/login')}}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
