import React from 'react'
import '../styles/Order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function Orders() {
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
              <p>None</p>
            < FontAwesomeIcon icon={faAngleUp} className="orders-arrowIcon" />
            </div>
          </div>
          <div className="orders-s-crop-type-container">
            <p className="order-s-crops-title">Crops</p>
            <div className="orders-s-crop-type-btn">
              <p>Crop Type</p>
              <FontAwesomeIcon icon={faAngleUp} className="orders-arrowIcon" />
            </div>
          </div>
          <div className="orders-s-quantity-container">
            <p className="order-s-quantity-title">Quantity</p>
            <div className="orders-s-quantity-btn">
              <input type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div className="order-form-container">
          <div className="order-input-fields">
            <div className="order-name-input">
              <label for>Name:</label>
              <input type="text" placeholder="Name" />
            </div>
            <div className="order-crop-type">
            <label for>Crop Type:</label>
              <input type="text" placeholder="Crop Type" /> 
            </div>
            <div className="order-quantity">
              <label>Quantity:</label>
              <input type="number" placeholder="Quantity" />   
            </div>  
          </div>  
        </div>
      </div>
    </div>
  )
}
