import { Link, useNavigate } from 'react-router-dom'
import '../styles/Register.css'

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    //handles when the form is submited (Register button is pressed)
    //form input values (ex.Name) etc will be retrieved and sent to the backend from here.
    event.preventDefault();
    navigate("/successfulregistration") //navigates to the successful registration if successful
  }
  
  return (
    <div className="outer-register-container">
      <div className="registerContainer">
        <div className="image-container">
          <div className="registration-spacer"></div>
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
              <h1>Hello</h1>
              <p>Join Us</p>
            </div>

            <form className='form-container' onSubmit={handleSubmit}>

              <div className="name-container">
                <input type="text" name="name" placeholder="Name/Company" required/>
              </div>
              
              <div className="email-container">
                <input type="email" name="email" placeholder="Email Address" required/>
              </div>

              <div className="address-container">
                <input type="text" name="address" placeholder="Address" required/>
              </div>

              <div className="crop-type-container">
                <input type="text" name="crop-type" placeholder="Crop Grown" required/>
              </div>

              <div className="farm-size-container">
                <input type="number" name="farm-size" placeholder="Farm Size/ha" required/>
              </div>

              <div className="production-container">
                <input type="text" name="production" placeholder="Production Capacity" required/>
              </div>

              <div className="submit-btn-container">
                <button className="registration-btn">Register</button>
              </div>
  
              <div className="registration-links">
                <div className="login-link-container">
                  <Link className="login-link" to="/login">Already have an account? <span className="clickable-login">Login</span></Link>
                </div>
              </div>
              
            </form>
          </div>
          
        </div>
      </div>
    </div>
  )
}
