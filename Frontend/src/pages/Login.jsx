import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { loginUser } from '../services/authService'
import { useState } from 'react';

/*
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGRlM2Y0YzNmNmMwMmUzYWIwMTVlNCIsImlhdCI6MTcxNjkwNjYwMywiZXhwIjoxNzE3MzM4NjAzfQ.ZoNlh6fryXGyiFAi0ZquLaO5tOTyKVlDYTKT8i7K2_s",
    "role": "user"
}
*/
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    //handles when the form is submited (login button is pressed)
    //form input values (ex.Name) etc will be retrieved and sent to the backend from here.
    event.preventDefault();

    //Passes email and password to backend for auth
    try {
      const data = await loginUser({ email, password });
      if (data.role == "admin") {
        navigate("/home") //navigates to the home page after authentication
      } else if (data.role == "user") {
        navigate("/home/farmer"); //navigates to the farmer home page after authentication
      }
    } catch (err) {
      console.error('Error object:', err);
      setError(err.message || 'Something went wrong, please try again!');
      console.log(err.message);
    }
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
          {error && <div className="error-alert">{error}</div>}
            <div className="login-title">
              <h1>Hello Again!</h1>
              <p>Welcome Back</p>
            </div>

            <form className='form-container' onSubmit={handleSubmit}>

              <div className="email-container">
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required/>
              </div>

              <div className="password-container">
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
              </div>

              <div className="submit-btn-container-l">
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
