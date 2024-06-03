import React, { useContext, useEffect, useState } from 'react'
import '../styles/FarmPopUp.css'
import { addFarmerDatails } from '../services/farmerService'
import { UserContext } from '../contexts/UserContext'

export const FarmPopUp = ({ setPopUp }) => {
  const { user } = useContext(UserContext)
  const [name, setName] = useState(user.name)
  const [location, setLocation] = useState();
  const [streetName, setStreetName] = useState();
  const [houseNumber, setHouseNumber] = useState();
  const [city, setCity] = useState();
  const [farmSize, setFarmSize] = useState();

  const handleSumbit = async () => {
    try {
      const data = await addFarmerDatails({ name, location, streetName, houseNumber, city, farmSize });
      setPopUp(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="farmpopup-container">
        <div className="popup-content">
            <div className="popupwrapper">
                <div className="popup-title">
                    <h1>Welcome to <span className="popup-title-company">FarmLink</span></h1>
                    <p>Please enter your farm Information</p>
                </div>
                <div className="popup-inputs">
                    <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required/>
                    <input type="text" placeholder="Street Name" onChange={(e) => setStreetName(e.target.value)} required/>
                    <input type="text" placeholder="Property Number" onChange={(e) => setHouseNumber(e.target.value)} required/>
                    <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} required/>
                    <input type="text" placeholder="Farm Size in Ha" onChange={(e) => setFarmSize(e.target.value)} required/>
                </div>
                <div className="popup-btn">
                    <button onClick={() => handleSumbit()}>Sumbit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
