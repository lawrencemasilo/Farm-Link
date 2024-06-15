import { useContext, useEffect, useState } from 'react'
import { profile } from '../services/ProfileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import '../styles/Details.css'
import { allFarmerDatails, updateFarmerDatails } from '../services/farmerService';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Details({handleGetLocation, coordinates, setReRender}) {
  const [user, setUser] = useState();
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
  const [coordinatesDb, setCoordinatesDb] = useState([]);
  const [selected, setSelected] = useState();
  const [updated,setUpdated] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    //fetches the information of the current user
    const fetchData = async () => {
      try {
        const data = await profile();
        setUser(data.data);
        if (data.data._id) {
          setId(data.data._id)
          setName(data.data.name)
          setEmail(data.data.email)
          setPhone(data.data.phone)
        }
      } catch(err) {
        console.log(err);
      }
    } 
    fetchData();
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
        setCoordinatesDb(data.data.coordinates)
      } catch(err) {
        console.log(err);
      }
    } 
    fetchData();
  }, [updated])


  const handleUpdate = async () => {
    //updates the current users information
    if (selected) {
      try {
        const data = await updateFarmerDatails({name, location, streetName, houseNumber, city, farmSize, coordinates});
        setUpdated(true)
        setReRender(prev => !prev); //sets state to re-render component;
      } catch(err) {
        console.log(err);
      }
    }
  }

  const handleUpdateCurrentCoords = () => {
    handleGetLocation();
    if (coordinates) {
      setSelected('coordinates')
      handleUpdate();
    }
  }

  return (
    <div className={`details-container ${theme}`}>
      <div className={`details-wrapper ${theme}`}>
        <div className={`details-selectors ${theme}`}>
          <div className="details-farmer-container">
            <p className={`details-farmer-title details-title  ${theme}`}>Name</p>
            <div className="details-farmer-input">
              <div className={`details-name-container ${theme}`}>
                <p className={`details-name ${theme} details-title ${theme}`}>{user && user.name}</p>
              </div>
            </div>
          </div>
          <div className="details-email-container">
            <p className={`details-email-title details-title ${theme}`}>Email</p>
            <div className="details-email-input">
              <div className={`details-email2-container ${theme}`}>
                <p className={`details-email ${theme} details-title ${theme}`}>{user && user.email}</p>
              </div>
            </div>
          </div>
          <div className="details-phone-container">
            <p className={`details-phone-title details-title ${theme}`}>Phone</p>
            <div className="details-phone-btn">
              <p className={`details-phone ${theme}`} >{user && user.phone}</p>
            </div>
          </div>
          <div className="details-location-container" onClick={() => setSelected('location')}>
            <p className={`details-location-title details-title ${theme}`}>Location</p>
            {!farm || selected == 'location'? <div className="details-location-btn">
              <input type="text" placeholder="" className="details-input-container" required onChange={(e) => setLocation(e.target.value)} />
            </div>:
            <div className={`details-location2-container ${theme}`}>
              <p className={`details-location ${theme} details-title ${theme}`}>{farm && farm.location}</p>
            </div>}
          </div>
          <div className="details-street-container" onClick={() => setSelected('street')}>
            <p className={`details-street-title details-title ${theme}`}>Street</p>
            {!farm || selected == 'street' ? <div className="details-street-btn">
              <input type="text" placeholder="" className="details-input-container" required onChange={(e) => setStreetName(e.target.value)}/>
            </div>: 
            <div className={`details-street2-container ${theme}`}>
              <p className={`details-street ${theme} details-title ${theme}`}>{farm && farm.streetName}</p>
            </div>}
          </div>
          <div className="details-house-container" onClick={() => setSelected('house')}>
            <p className={`details-house-title details-title ${theme}`}>Property Number</p>
            {!farm || selected == 'house' ?<div className="details-house-btn">
              <input type="number" placeholder="" className="details-input-container" required onChange={(e) => setHouseNumber(e.target.value)} />
            </div>:
            <div className={`details-house2-container ${theme}`}>
              <p className={`details-house ${theme} details-title ${theme}`}>{farm && farm.houseNumber}</p>
            </div>}
          </div>
          <div className="details-city-container" onClick={() => setSelected('city')}>
            <p className={`details-city-title details-title ${theme}`}>City</p>
            {!farm || selected == 'city' ?<div className="details-city-btn">
              <input type="text" placeholder="" className="details-input-container" required onChange={(e) => setCity(e.target.value)}/>
            </div>:
            <div className={`details-city2-container ${theme}`}>
              <p className={`details-city ${theme} details-title ${theme}`}>{farm && farm.city}</p>
            </div>}
          </div>
          <div className=" details-plot-container" onClick={() => setSelected('plot')}>
            <p className={`details-title ${theme}`}>Plot Size</p>
            {!farm || selected == 'plot' ?<div className="details-plot-btn">
              <input type="number" placeholder="" className="details-input-container" required onChange={(e) => setFarmSize(e.target.value)}/>
            </div>:
            <div className="details-plot2-container">
              <p className={`details-plot ${theme} details-title ${theme}`}>{farm && farm.farmSize}</p>
            </div>}
          </div>
          <div className=" details-coordinates-container">
            <p className={`details-title ${theme}`}>Coordinates</p>
            {farm && <div className="details-coordinates2-btn">
              <p className={`details-value ${theme}`}>{farm && farm.coordinates && farm.coordinates.latitude}
              <span>, </span>
              {farm && farm.coordinates && farm.coordinates.longitude}</p>
            </div>}
          </div>
        </div>
        <div className="update-details-btn-wrapper">
          <div className={`update-details-container ${theme}`} onClick={handleUpdate}>
            <FontAwesomeIcon icon={faCirclePlus} className="update-detailsIcon" />
            <p>Update</p>
          </div>
          <div className={`update-coords-details-container ${theme}`}>
            <FontAwesomeIcon 
              icon={faLocationCrosshairs}
              className="update-coordes-detailsIcon"
              onClick={handleUpdateCurrentCoords}/>
          </div>
        </div>
      </div>
    </div>
  )
}
