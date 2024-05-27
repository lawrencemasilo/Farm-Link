import React from 'react'
import farmersData from '../dataTest'
import '../styles/Farmer.css'

/*
{
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      address: '123 Main St',
      farmSize: '50 hectare',
      cropType: 'Wheat',
      production: '1000 kg'
    },
*/
export default function Farmer({selectedFarmer, setSelectedFarmer}) {
  return (
    <div className="indiv-farmer-container">
        <div className="indiv-farmer-wrapper">
            <div className="farmer-back-container" onClick={() => setSelectedFarmer()}>X</div>
            <div className="farmer-info-wrapper">
                {farmersData.map(function(farmer) {
                    if(farmer.id == selectedFarmer) {
                        return(
                        <div className="farmer-info">
                            <p><span>Name:</span> {farmer.name}</p>
                            <p><span>Email:</span> {farmer.email}</p>
                            <p><span>Address:</span> {farmer.address}</p>
                            <p><span>Farm Size:</span> {farmer.farmSize}</p>
                            <p><span>Crop Type:</span> {farmer.cropType}</p>
                            <p><span>Production:</span> {farmer.production}</p>
                        </div>
                    )
                    }}
                )}
                <div className="contact-delect-container">
                    <button className="farmer-order-btn">Order</button>
                    <button className="farmer-contact-btn">Contact</button>
                    <button className="farmer-deregister">Deregister</button>
                </div>
            </div>
        </div>
    </div>
  )
}
