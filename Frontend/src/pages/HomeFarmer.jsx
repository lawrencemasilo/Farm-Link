import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import { useContext, useState } from 'react'
import Profile from '../components/Profile'
import SideBarFarmer from '../components/SideBarFarmer'
import Produce from '../components/Produce'
import Settings from '../components/Settings'
import { ThemeContext } from '../contexts/ThemeContext'
import { UserContext } from '../contexts/UserContext'
import { FarmPopUp } from '../components/FarmPopUp'

export default function HomeFarmer() {
  const [navItem, setNavItem] = useState('profile');
  const { theme } = useContext(ThemeContext);
  const [popUp, setPopUp] = useState(true);
  const { user } = useContext(UserContext);
  

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    })
  }
    

  const successLocation = (position) => {
    console.log(position) //test
  }

  const errorLocation = (error) => {
    console.log(error) //test
  }

  return (
    <div className={`home-container ${theme}`}>
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {/*getting current Location test */}
        {user && handleGetLocation()}
        {/*getting current Location test */}
        {user && user.farm  && popUp && <FarmPopUp setPopUp={setPopUp} />}
        {<SideBarFarmer setNavItem={setNavItem} />}
        {navItem === 'profile' && <Profile />}
        {navItem === 'produce' && <Produce />}
        {navItem === 'settings' && <Settings />}
      </div>
    </div>
  )
}
