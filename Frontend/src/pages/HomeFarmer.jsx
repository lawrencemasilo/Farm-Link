import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import { useContext, useEffect, useState } from 'react'
import Profile from '../components/Profile'
import SideBarFarmer from '../components/SideBarFarmer'
import Produce from '../components/Produce'
import Settings from '../components/Settings'
import { ThemeContext } from '../contexts/ThemeContext'
import { UserContext } from '../contexts/UserContext'
import { FarmPopUp } from '../components/FarmPopUp'
import { allFarmerDatails, updateFarmerDatails } from '../services/farmerService'

export default function HomeFarmer() {
  const [navItem, setNavItem] = useState('profile');
  const { theme } = useContext(ThemeContext);
  const [popUp, setPopUp] = useState(true);
  const { user } = useContext(UserContext);
  const [coordinates, setCoordinates] = useState({});
  const [farm, setFarm] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [streetName, setStreetName] = useState();
  const [houseNumber, setHouseNumber] = useState();
  const [city, setCity] = useState();
  const [farmSize, setFarmSize] = useState();

  useEffect(() => {
    //fetches the information of the current user
      try {
        if (user._id) {
          setId(user._id)
          setName(user.name)
          setEmail(user.email)
          setPhone(user.phone)
        }
      } catch(err) {
        console.log(err);
      }
  }, [])

  useEffect(() => {
    //fetches all the information of the farmer
    const fetchData = async () => {
      try {
        const data = await allFarmerDatails();
        setFarm(data.data);
        setLocation(data.data.location)
        setStreetName(data.data.streetName)
        setHouseNumber(data.data.houseNumber)
        setCity(data.data.city)
        setFarmSize(data.data.farmSize)
      } catch(err) {
        console.log(err);
      }
    } 
    fetchData();
  }, [])

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    })
  }
    

  const successLocation = (position) => {
    setCoordinates( position.coords.latitude, position.coords.longitude) //test
  }

  const errorLocation = (error) => {
    console.log(error) //test
  }

  const handleUpdate = async () => {
    //updates the current users information
      try {
        const data = await updateFarmerDatails({name, location, streetName, houseNumber, city, farmSize, coordinates});
        console.log("update sent")
      } catch(err) {
        console.log(err);
      }
  }

  return (
    <div className={`home-container ${theme}`}>
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {/*getting current Location test */}
        {handleGetLocation()}
        {/*getting current Location test */}
        {coordinates && handleUpdate}
        {/*user && user.farm  && popUp && <FarmPopUp setPopUp={setPopUp} coordinates={coordinates} />*/}
        {<SideBarFarmer setNavItem={setNavItem} />}
        {navItem === 'profile' && <Profile />}
        {navItem === 'produce' && <Produce />}
        {navItem === 'settings' && <Settings />}
      </div>
    </div>
  )
}
