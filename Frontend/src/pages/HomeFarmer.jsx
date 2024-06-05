import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import SideBar from '../components/SideBar'
import Members from '../components/Members'
import { useContext, useEffect, useState } from 'react'
import Orders from '../components/Orders'
import PlaceDelivery from '../components/PlaceDelivery'
import Profile from '../components/Profile'
import SideBarFarmer from '../components/SideBarFarmer'
import Produce from '../components/Produce'
import { SidebarContext } from '../contexts/SideBarContext'
import { SelectedFarmerContext } from '../contexts/SelectedFarmerContext'
import Settings from '../components/Settings'
import { ThemeContext } from '../contexts/ThemeContext'
import { profile } from '../services/ProfileService'
import { UserContext } from '../contexts/UserContext'
import { FarmPopUp } from '../components/FarmPopUp'

export default function HomeFarmer() {
  const [navItem, setNavItem] = useState('profile');
  const { theme } = useContext(ThemeContext);
  const [selected, setSelected] = useState('recent');
  //const [user, setUser] = useState();
  const [farmerInfo, setFarmerInfo] = useState()
  const [popUp, setPopUp] = useState(true);
  const { user } = useContext(UserContext);


  /*const fetchData = async () =>  {
    try {
      const theData = await getUserOrders();
      console.log(theData)
    } catch (error) {
      console.log(error)
    } 
  }*/
  
  /*useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await profile();
        setUser(data.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])*/

  console.log(user)
  return (
    <div className={`home-container ${theme}`}>
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {user && !user.farm && popUp && <FarmPopUp setPopUp={setPopUp} />}
        {<SideBarFarmer setNavItem={setNavItem} setSelectedItem={setSelected} />}
        {navItem === 'profile' && <Profile />}
        {navItem === 'produce' && <Produce />}
        {navItem === 'settings' && <Settings />}
      </div>
    </div>
  )
}
