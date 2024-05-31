import React, { useEffect, useState } from 'react'
import { profile } from '../services/ProfileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import '../styles/Details.css'
import { farmerDatails, allFarmerDatails, updateFarmerDatails } from '../services/farmerService';

export default function Details() {
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
  const [selected, setSelected] = useState();

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
      } catch(err) {
        console.log(err);
      }
    } 
    fetchData();
  }, [])


  const handleUpdate = async () => {
    //updates the current users information
    if (selected) {
      try {
        const data = await updateFarmerDatails({name, location, streetName, houseNumber, city, farmSize});
        console.log("update sent")
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="details-container">
      <div className="details-wrapper">
        <div className="details-selectors">
          <div className="details-farmer-container">
            <p className="details-farmer-title details-title">Name</p>
            <div className="details-farmer-input">
              <div className="details-name-container">
                <p className="details-name details-value">{user && user.name}</p>
              </div>
            </div>
          </div>
          <div className="details-email-container">
            <p className="details-email-title details-title">Email</p>
            <div className="details-email-input">
              <div className="details-email2-container">
                <p className="details-email details-value">{user && user.email}</p>
              </div>
            </div>
          </div>
          <div className="details-phone-container">
            <p className="details-phone-title details-title">Phone</p>
            <div className="details-phone-btn">
              <p className="details-phone" >{user && user.phone}</p>
            </div>
          </div>
          <div className="details-location-container" onClick={() => setSelected('location')}>
            <p className="details-location-title details-title">Location</p>
            {!farm || selected == 'location'? <div className="details-location-btn">
              <input type="text" placeholder="" className="details-input-container" required onChange={(e) => setLocation(e.target.value)} />
            </div>:
            <div className="details-location2-container">
              <p className="details-location details-value">{farm && farm.location}</p>
            </div>}
          </div>
          <div className="details-street-container" onClick={() => setSelected('street')}>
            <p className="details-street-title details-title">Street</p>
            {!farm || selected == 'street' ? <div className="details-street-btn">
              <input type="text" placeholder="" className="details-input-container" required onChange={(e) => setStreetName(e.target.value)}/>
            </div>: 
            <div className="details-street2-container">
              <p className="details-street details-value">{farm && farm.streetName}</p>
            </div>}
          </div>
          <div className="details-house-container" onClick={() => setSelected('house')}>
            <p className="details-house-title details-title">House Number</p>
            {!farm || selected == 'house' ?<div className="details-house-btn">
              <input type="number" placeholder="" className="details-input-container" required onChange={(e) => setHouseNumber(e.target.value)} />
            </div>:
            <div className="details-house2-container">
              <p className="details-house details-value">{farm && farm.houseNumber}</p>
            </div>}
          </div>
          <div className="details-city-container" onClick={() => setSelected('city')}>
            <p className="details-city-title details-title">City</p>
            {!farm || selected == 'city' ?<div className="details-city-btn">
              <input type="text" placeholder="" className="details-input-container" required onChange={(e) => setCity(e.target.value)}/>
            </div>:
            <div className="details-city2-container">
              <p className="details-city details-value">{farm && farm.city}</p>
            </div>}
          </div>
          <div className=" details-plot-container" onClick={() => setSelected('plot')}>
            <p className="details-title">Plot Size</p>
            {!farm || selected == 'plot' ?<div className="details-plot-btn">
              <input type="number" placeholder="" className="details-input-container" required onChange={(e) => setFarmSize(e.target.value)}/>
            </div>:
            <div className="details-plot2-container">
              <p className="details-plot details-value">{farm && farm.farmSize}</p>
            </div>}
          </div>
        </div>
        <div className="update-details-container" onClick={handleUpdate}>
          <FontAwesomeIcon icon={faCirclePlus} className="update-detailsIcon" />
          <p>Update</p>
        </div>
      </div>
    </div>
  )
}
