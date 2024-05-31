import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Product from './Product'
import { placeOrder } from '../services/OrderService'

export default function Orders({ user, handleOrderClick }) {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [add, setAdd] = useState(false);

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleOrder = async () => {
    if (!user || !selectedCrop || quantity <= 0) {
      alert('Please select a crop and enter a valid quantity');
      return;
    }

    const cropId = user.farm.crops.find(crop => crop.cropName === selectedCrop)._id;
    const orderDetails = {
      cropId,
      quantity: Number(quantity),
    }
    try {
      const response = await placeOrder(orderDetails);
      console.log('Order response:', response);
      setSelectedCrop('');
      setQuantity(0);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        <div className="orders-title">
          <h1>Place Order</h1>
        </div>
        <div className="orders-nav-container">
          <div className="orders-title-container">
            <p className="Orders-nav-title">Order</p>
          </div>
        </div>
        <div className="order-selectors">
          
          <div className="orders-s-farmer-container">
            <p className="order-s-farmer-title">Farmer</p>
            <div className="orders-s-farmer-btn">
              <p>{ user ? user.name : null}</p>
            < FontAwesomeIcon icon={faAngleUp} className="orders-arrowIcon" />
            </div>
          </div>
          <div className="orders-s-crop-type-container">
            <p className="order-s-crops-title">Crops</p>
            <div className="orders-s-crop-type-btn">
              <select value={selectedCrop} onChange={handleCropChange} className=" crop-type-sel">
                <option value=""></option>
                { user && user.farm ? user.farm.crops.map(crop => (
                  <option key={crop._id} value={crop.cropName}>{crop.cropName}</option>
                )) : <option value="">No Crops</option>}
              </select>
            </div>
          </div>
          <div className="orders-s-quantity-container">
            <p className="order-s-quantity-title">Quantity</p>
            <div className="orders-s-quantity-btn">
              <input type="number" placeholder="0" required value={quantity} onChange={handleQuantityChange}/>
            </div>
          </div>
        </div>
        {user ? <div className="add-order-container" onClick={handleOrder}>
          <FontAwesomeIcon icon={faCirclePlus} className="add-orderIcon" />
          <p>Add</p>
        </div> :
        <div className="add-order-container">
          <FontAwesomeIcon icon={faCirclePlus} className="add-orderIcon" />
          <p>Add</p>
        </div>}
        <div className="order-form-container">
          <div className="order-output-container">
          </div>  
        </div>
      </div>
    </div>
  )
}
