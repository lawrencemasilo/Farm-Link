import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import SideBar from '../components/SideBar'
import Members from '../components/Members'
import { useState } from 'react'
import Orders from '../components/Orders'
import PlaceDelivery from '../components/PlaceDelivery'

export default function Home() {
  const [navItem, setNavItem] = useState('members');
  const [selected, setSelected] = useState('recent');

  return (
    <div className="home-container">
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {<SideBar setNavItem={setNavItem} setSelectedItem={setSelected} />}
        {navItem === 'order' &&  <Orders />}
        {navItem === 'members' &&  <Members />}
        {navItem === 'place delivery' && <PlaceDelivery />}
      </div>
    </div>
  )
}
