import { useNavigate } from 'react-router-dom'
import '../styles/HeaderSignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faGear, faUser } from '@fortawesome/free-solid-svg-icons'


/*
<div className="home-search-container">
  <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
  <input type="text" placeholder="Search..." />
</div>
*/
export default function HeaderSignIn() {
  const navigate = useNavigate();

  return (
    <div className="header_signin-container">
      <div className="logo_signin-container">
        <h1>FarmLink</h1>
      </div>
      <div className="header-nav">
        
      </div>
      <div className="signin-wrapper">
        <div className="logout-btn-container">
          <div className="setting-container">
            <FontAwesomeIcon icon={faGear} className="settingsIcon"/>
            <p className="settings-title">Settings</p>
          </div>
          <div className="profile-container">
            <FontAwesomeIcon icon={faUser} className="profileIcon" />
            <p className="userName-title">User</p>
          </div>
          <div className="logout-container">
            <button onClick={() => {navigate('/login')}}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
