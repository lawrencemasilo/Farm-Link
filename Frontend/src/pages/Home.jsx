import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import SideBar from '../components/SideBar'
import Members from '../components/Members'
import { useEffect, useState, useContext } from 'react'
import Orders from '../components/Orders'
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/Members.css'
import ListOrders from '../components/ListOrders'
import Settings from '../components/Settings'

export default function Home() {
  const [navItem, setNavItem] = useState('members');
  const [selected, setSelected] = useState('recent');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState();
  const { theme } = useContext(ThemeContext);

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
    <div className={`home-container ${theme}`}>
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
        {navItem === 'listOrders' && <ListOrders />}
        {navItem === 'settings' && <Settings />}
      </div>
    </div>
  )
}
