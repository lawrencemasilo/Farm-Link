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
import { SidebarContext } from '../contexts/SideBarContext'
import { SelectedFarmerContext } from '../contexts/SelectedFarmerContext'
import Farmers from '../components/Farmers'
import Farmer from '../components/Farmer'
import '../styles/Members.css'


export default function Home() {
  //const [navItem, setNavItem] = useState('members');
  //const [selected, setSelected] = useState('recent');*/
  //const [showOrderForm, setShowOrderForm] = useState(false);
  //const [selectedFarmer, setSelectedFarmer] = useState();
  const { theme } = useContext(ThemeContext);
  const { navItem, setNavItem} = useContext(SidebarContext);
  const { selectedFarmer, setSelectedFarmer, showOrderForm, setShowOrderForm } = useContext(SelectedFarmerContext)

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

  const handleOrderClose = () => {
    setShowOrderForm(false);
    setSelectedFarmer(null);
  }
  return (
    <div className={`home-container ${theme}`}>
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {/*<SideBar setNavItem={setNavItem} setSelectedItem={setSelected} />*/}
        {<SideBar />}
        {selectedFarmer && showOrderForm && (
          <Orders user={selectedFarmer} handleOrderClose={handleOrderClose}/>)}
        {navItem === 'order' && !showOrderForm && selectedFarmer === null &&  <Orders />}
        {navItem === 'members' && !showOrderForm &&  (
          <Members 
            handleOrderClick={handleOrderClick} 
            selectedFarmer={selectedFarmer} 
            setSelectedFarmer={setSelectedFarmer}
            showOrderForm={showOrderForm}
            setShowOrderForm={setShowOrderForm}
            />)}
        {navItem === 'listOrders' && <ListOrders />}
        {navItem === 'settings' && <Settings />}
      </div>
    </div>
  )
}
