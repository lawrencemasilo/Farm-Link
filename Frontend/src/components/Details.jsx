import React, { useEffect, useState } from 'react'
import { profile } from '../services/ProfileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import '../styles/Details.css'
import { farmerDatails, allFarmerDatails } from '../services/farmerService';

//user
/*
{
    "_id": "6655ec89c48b74f0d219071c",
    "name": "admin3",
    "email": "admin3@gmail.com",
    "phone": "09834718920",
    "role": "user",
    "orders": [],
    "deliveries": [],
    "createdAt": "2024-05-28T14:39:05.256Z",
    "__v": 0
}
*/

//farm:
//name, location, streetName, houseNumber, city, farmSize
export default function Details() {
  const [user, setUser] = useState();
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
    const fetchData = async () => {
      try {
        const data = await profile();
        setUser(data.data);
        if (data.data._id) {
          setId(data.data._id)
          //console.log(data.data._id)
        }
      } catch(err) {
        console.log(err);
      }
    } 
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allFarmerDatails();
        console.log(data);

      } catch(err) {
        console.log(err);
      }
    } 
    fetchData();
  }, [])

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
              <input type="number" placeholder={user && user.phone} className="details-input-container" />
            </div>
          </div>
          <div className="details-location-container">
            <p className="details-location-title details-title">Location</p>
            <div className="details-location-btn">
              <input type="number" placeholder="" className="details-input-container" required />
            </div>
          </div>
          <div className="details-street-container">
            <p className="details-street-title details-title">Street</p>
            <div className="details-street-btn">
              <input type="number" placeholder="" className="details-input-container" required />
            </div>
          </div>
          <div className="details-house-container">
            <p className="details-house-title details-title">House Name</p>
            <div className="details-house-btn">
              <input type="number" placeholder="" className="details-input-container" required />
            </div>
          </div>
          <div className="details-city-container">
            <p className="details-city-title details-title">City</p>
            <div className="details-city-btn">
              <input type="number" placeholder="" className="details-input-container" required />
            </div>
          </div>
          <div className=" details-plot-container">
            <p className="details-title">Plot Size</p>
            <div className="details-plot-btn">
              <input type="number" placeholder="" className="details-input-container" required />
            </div>
          </div>
        </div>
        <div className="add-produce-container">
          <FontAwesomeIcon icon={faCirclePlus} className="add-produceIcon" />
          <p>Add</p>
        </div>
      </div>
    </div>
  )
}
