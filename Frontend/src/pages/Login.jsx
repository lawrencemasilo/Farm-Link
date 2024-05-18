import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    //handles when the form is submited (login button is pressed)
    //form input values (ex.Name) etc will be retrieved and sent to the backend from here.
    event.preventDefault();
    navigate("/home") //navigates to the home page after authentication
  }

  return (
    <div className="outer-login-container">
      <div className="loginContainer">
        <div className="image-container">
          <div className="login-spacer"></div>
          <div className="title_slogan-container">
            <h1 className="FarmLink-title">FarmLink</h1>
            <p className="Farmlink-slogans">Link the future of farming with us</p>
            <button className="back-btn" onClick={() => navigate("/")}>Back</button>
          </div>
          
        </div>

        <div className="input-container">
          <div className="input-spacer"></div>
          <div className="input-content-container">
            <div className="title">
              <h1>Hello Again!</h1>
              <p>Welcome Back</p>
            </div>

            <form className='form-container' onSubmit={handleSubmit}>

              <div className="email-container">
                <input type="email" name="email" placeholder="Email Address" required/>
              </div>

              <div className="password-container">
                <input type="password" name="password" placeholder="Password" required/>
              </div>

              <div className="submit-btn-container">
                <button className="login-btn">Login</button>
              </div>
  
              <div className="login-links">
                <div className="register-link-container">
                  <Link className="register-link" to="/register">Register</Link>
                </div>

                <div className="link-divider"></div>

                <div className="forgot-password-container">
                  <Link className="forgot-password-link" to="/forgotpassword">Forgot Password</Link>
                </div>
              </div>
              
            </form>
          </div>
          
        </div>
      </div>
    </div>
  )
}
