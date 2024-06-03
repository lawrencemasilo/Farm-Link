import React, { useContext } from 'react'
import { farmerDelete } from '../services/farmerService';
import '../styles/Farmer.css'
import { ThemeContext } from '../contexts/ThemeContext';

// Styles for the swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SelectedFarmerContext } from '../contexts/SelectedFarmerContext';

export default function Farmer({ onOrderClick }) {
    const { theme } = useContext(ThemeContext);
    const { selectedFarmer, setSelectedFarmer } = useContext(SelectedFarmerContext)

    const handleDeregister = async () => {
        //Handles the Deregistration of a user
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
            <div className={`farmer-back-container ${theme}`} onClick={() => setSelectedFarmer()}>X</div>
            <div className="farmer-info-wrapper">
                {selectedFarmer && (
                    <div className={`farmer-info ${theme}`}>
                        <p><span>Name:</span> {selectedFarmer.name}</p>
                        <p><span>Email:</span> {selectedFarmer.email}</p>
                        <p><span>Phone:</span> {selectedFarmer.phone}</p>
                        {selectedFarmer.farm && (
                            <div className={`farm-data-container ${theme}`}>
                                <p><span>Farm Name:</span> {selectedFarmer.farm.name}</p>
                                <p><span>Location:</span> {selectedFarmer.farm.location}</p>
                                <p><span>Farm Size:</span> {selectedFarmer.farm.farmSize} ha</p>
                                <h4>Crops:</h4>
                                {/*<Swiper className='swiper-container' spaceBetween={30} slidesPerView={3} navigation pagination={{clickable: true}} style={{ width: '100%' }}>
                                    {selectedFarmer.farm.crops.map(crop => (
                                        <SwiperSlide key={crop._id}>
                                            <div className='crop-slide'>
                                            <p><span>Crop Name:</span> {crop.cropName}</p>
                                            <p><span>Plant Date:</span> {new Date(crop.plantDate).toLocaleDateString()}</p>
                                            <p><span>Plant Date:</span> {new Date(crop.harvestDate).toLocaleDateString()}</p>
                                            <p><span>Availability:</span> {crop.availability} kg</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>*/}
                            </div>
                        )}
                    </div>
                    )}
                    <div className="contact-delect-container">
                        <button className="farmer-order-btn" onClick={() => onOrderClick(selectedFarmer)}>Order</button>
                        {selectedFarmer && selectedFarmer.email ? (
                            <a href={`mailto:${selectedFarmer.email}`}>
                                <button className="farmer-contact-btn">Contact</button>
                            </a>
                        ) : (
                            <button className="farmer-contact-btn" onClick={() => alert('No email address available')}>Contact</button>
                        )}
                        <button className="farmer-deregister" onClick={handleDeregister}>Deregister</button>
                    </div>
            </div>
        </div>
    </div>
  );
}
