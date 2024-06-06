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
  
  console.log(user)
  return (
    <div className={`home-container ${theme}`}>
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {user && !user.farm  && popUp && <FarmPopUp setPopUp={setPopUp} />}
        {<SideBarFarmer setNavItem={setNavItem} />}
        {navItem === 'profile' && <Profile />}
        {navItem === 'produce' && <Produce />}
        {navItem === 'settings' && <Settings />}
      </div>
    </div>
  )
}
