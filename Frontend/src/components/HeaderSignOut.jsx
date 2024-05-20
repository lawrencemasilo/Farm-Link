import '../styles/HeaderSignOut.css'

export default function HeaderSignOut() {
  return (
    <div className="header-container">
      <div className="logo-container">
        <h1>FarmLink</h1>
      </div>
      <div className="wrapper">
        <div className="nav">
          <div className="home-link-container">
            <p>Services</p>
          </div>
          <div className="about_us-link-container">
            <p>About Us</p>
          </div>
        </div>
        <div className="login_register-btn-container">
          <div className="login-container">
            <button>Login</button>
          </div>
          <div className="register-container">
            <button>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}
