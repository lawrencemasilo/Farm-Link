import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import SideBar from '../components/SideBar'
import Members from '../components/Members'
import { useState } from 'react'
import Orders from '../components/Orders'
import PlaceDelivery from '../components/PlaceDelivery'
import Profile from '../components/Profile'
import SideBarFarmer from '../components/SideBarFarmer'
import Produce from '../components/Produce'

export default function HomeFarmer() {
  const [navItem, setNavItem] = useState('profile');
  const [selected, setSelected] = useState('recent');

  return (
    <div className="home-container">
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {<SideBarFarmer setNavItem={setNavItem} setSelectedItem={setSelected} />}
        {navItem === 'profile' && <Profile />}
        {navItem === 'produce' && <Produce />}
      </div>
    </div>
  )
}
