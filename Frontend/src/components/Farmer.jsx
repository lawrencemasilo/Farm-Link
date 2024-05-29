import React from 'react'
import { farmerDelete } from '../services/farmerService';
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
export default function Farmer({selectedFarmer, setSelectedFarmer, onOrderClick }) {
    const handleDeregister = async () => {
        try {
            if (selectedFarmer && selectedFarmer._id) {
                await farmerDelete(selectedFarmer._id);
                alert('Farmer deregistered successfully');
                setSelectedFarmer(null);
            }
        } catch (error) {
            console.error('Error deregistering farmer:', error);
        }
    };
  return (
    <div className="indiv-farmer-container">
        <div className="indiv-farmer-wrapper">
            <div className="farmer-back-container" onClick={() => setSelectedFarmer()}>X</div>
            <div className="farmer-info-wrapper">
                {selectedFarmer && (
                    <div className="farmer-info">
                        <p><span>Name:</span> {selectedFarmer.name}</p>
                        <p><span>Email:</span> {selectedFarmer.email}</p>
                        <p><span>Phone:</span> {selectedFarmer.phone}</p>
                        {selectedFarmer.farm && (
                            <>
                                <p><span>Farm Name:</span> {selectedFarmer.farm.name}</p>
                                <p><span>Location:</span> {selectedFarmer.farm.location}</p>
                                <p><span>Farm Size:</span> {selectedFarmer.farm.farmSize} ha</p>
                                <h4>Crops:</h4>
                                <ul>
                                    {selectedFarmer.farm.crops.map(crop => (
                                        <li key={crop._id}>
                                            <p><span>Crop Name:</span> {crop.cropName}</p>
                                            <p><span>Plant Date:</span> {new Date(crop.plantDate).toLocaleDateString()}</p>
                                            <p><span>Plant Date:</span> {new Date(crop.harvestDate).toLocaleDateString()}</p>
                                            <p><span>Availability:</span> {crop.availability} kg</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    )}
                    <div className="contact-delect-container">
                        <button className="farmer-order-btn" onClick={() => onOrderClick(selectedFarmer)}>Order</button>
                        <button className="farmer-contact-btn">Contact</button>
                        <button className="farmer-deregister" onClick={handleDeregister}>Deregister</button>
                    </div>
            </div>
        </div>
    </div>
  );
}
