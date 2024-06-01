import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import SideBar from '../components/SideBar'
import Members from '../components/Members'
import { useEffect, useState } from 'react'
import Orders from '../components/Orders'
import PlaceDelivery from '../components/PlaceDelivery'
import Farmers from '../components/Farmers'
import '../styles/Members.css'

export default function Home() {
  const [navItem, setNavItem] = useState('members');
  const [selected, setSelected] = useState('recent');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState();

  const handleOrderClick = (user) => {
    if (user != null) {
      setShowOrderForm(true);
      setSelectedFarmer(user);
    }
    if (user === null) {
      setShowOrderForm(false);
      setSelectedFarmer(null);
      setNavItem('order')
    }
  }
  return (
    <div className="home-container">
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {<SideBar setNavItem={setNavItem} setSelectedItem={setSelected} />}
        {selectedFarmer && showOrderForm && (
          <Orders user={selectedFarmer} handleOrderClick={handleOrderClick}/>)}
        {navItem === 'order' && !showOrderForm && selectedFarmer === null &&  <Orders />}
        {navItem === 'members' && !showOrderForm &&  
          <Members 
            handleOrderClick={handleOrderClick} 
            selectedFarmer={selectedFarmer} 
            setSelectedFarmer={setSelectedFarmer}
            showOrderForm={showOrderForm}/>}
      </div>
    </div>
  )
}
