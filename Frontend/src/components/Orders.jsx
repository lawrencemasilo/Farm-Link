import React from 'react'
import '../styles/Order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Product from './Product'

export default function Orders({ user }) {
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
              <p>{ user ? user.name : None}</p>
            < FontAwesomeIcon icon={faAngleUp} className="orders-arrowIcon" />
            </div>
          </div>
          <div className="orders-s-crop-type-container">
            <p className="order-s-crops-title">Crops</p>
            <div className="orders-s-crop-type-btn">
              <p>{ user && user.farm ? user.farm.crops.map(crop => crop.cropName).join(', ') : 'Crop Name'}</p>
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
        <div className="add-order-container">
          <FontAwesomeIcon icon={faCirclePlus} className="add-orderIcon" />
          <p>Add</p>
        </div>
        <div className="order-form-container">
          <div className="order-output-container">
            {<Product />}
          </div>  
        </div>
      </div>
    </div>
  )
}
