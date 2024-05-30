import React, { useState } from 'react'
import '../styles/Order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import ProduceItem from './ProduceItem'
import Calender from './Calender'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Calender.css'

export default function Produce() {
  const [selectedCrop, setSelectedCrop] = useState('--None--');
  const [dropDown, setDropDown] = useState(false);
  const [quantity, setQuantity] = useState ('0');
  const [add, setadd] = useState(false);
  const [produce, setProduce] = useState([]);
  const [dropDownPlantDate, setDropDownPlantDate] = useState(false);
  const [selectedPlantDate, setSelectedPlantDate] = useState(null);
  const [selectedHarvestDate, setSelectedHarvestDate] = useState(null);
  const [plot, setPLot] = useState();

  const handleSelect = (crop) => {
    //stores selected crop to state
    setSelectedCrop(crop);
    setDropDown(false);
  }

  
  const handleAdd = () => {
    setadd(true)
    const newProduce = { selectedCrop, quantity };
    setProduce([...produce, newProduce])
  }

  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        <div className="orders-title">
          <h1>Available Produce</h1>
        </div>
        <div className="orders-nav-container">
          <div className="orders-title-container">
            <p className="Orders-nav-title">Produce</p>
          </div>
        </div>
        <div className="order-selectors">
          <div className="orders-s-crop-type-container">
            <p className="order-s-crops-title">Crops</p>
            <div className="orders-s-crop-type-btn" onClick={() => setDropDown((prev) => !prev)}>
              <p>{selectedCrop}</p>
              <FontAwesomeIcon icon={faAngleUp} className="orders-arrowIcon" />
            </div>
            {dropDown && <div className="crop-type-dropDown">
              <p onClick={() => handleSelect("--None--")}>--None--</p>
              <p onClick={() => handleSelect("Tomatos")}>Tomatos</p>
              <p onClick={() => handleSelect("Mushrooms")}>Mushrooms</p>
              <p onClick={() => handleSelect("Potates")}>Potatoes</p>
              <p onClick={() => handleSelect("Onions")}>Onions</p>
              <p onClick={() => handleSelect("Sprouts")}>Sprouts</p>
              <p onClick={() => handleSelect("Pumpkins")}>Pumpkins</p>
              <p onClick={() => handleSelect("Beans")}>Beans</p>
              <p onClick={() => handleSelect("Spinach")}>Spinach</p>
              <p onClick={() => handleSelect("Peppers")}>Peppers</p>
            </div>}
          </div>
          <div className="orders-s-quantity-container">
            <p className="order-s-quantity-title">Quantity</p>
            <div className="orders-s-quantity-btn">
              <input type="number" placeholder={quantity} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
          </div>
          <div className="orders-s-plantDate-container">
            <p className="order-s-plantDate-title">Planted</p>
            <div className="orders-s-plantDate-btn" onClick={() => setDropDownPlantDate((prev) => !prev)}>
              {<Calender selectedPlantDate={selectedPlantDate} setSelectedPlantDate={setSelectedPlantDate} />}
              <FontAwesomeIcon icon={faAngleUp} className="orders-arrowIcon2" />
            </div>
          </div>
          <div className="orders-s-harvestDate-container">
            <p className="order-s-harvestDate-title">Havested</p>
            <div className="orders-s-harvestDate-btn" onClick={() => setDropDownPlantDate((prev) => !prev)}>
              <div className="calender-container">
                <DatePicker
                  selected={selectedHarvestDate}
                  onChange={(date) => setSelectedHarvestDate(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                />
              </div>
              <FontAwesomeIcon icon={faAngleUp} className="orders-arrowIcon2" />
            </div>
          </div>
          <div className="orders-s-quantity-container plot-size">
            <p className="order-s-quantity-title">Plot Size</p>
            <div className="orders-s-quantity-btn">
              <input type="number" placeholder={plot} value={plot} onChange={(e) => setPLot(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className="add-produce-container" onClick={() => handleAdd(true)}>
          <FontAwesomeIcon icon={faCirclePlus} className="add-produceIcon" />
          <p>Add</p>
        </div>
      </div>
      <div className="produce-form-container">
        <div className="produce-title-container">
          <p className="produce-title-produce">Produce</p>
          <div className="product-title-produce-container">
            <p className="produce-title-quantity">Quantity</p>
          </div>
        </div>
        <div className="order-output-container">
          {add && produce.map((item, key) => (
            item.selectedCrop != '--None--' && item.quantity > 0 && selectedPlantDate && selectedHarvestDate && plot ? 
              (
              <ProduceItem 
                key={key} 
                crop={item.selectedCrop} 
                quantityL={item.quantity} 
                selectedPlantDate={selectedPlantDate} 
                selectedHarvestDate={selectedHarvestDate} 
                plot={plot}/>
              ): null
          ))}
        </div>
      </div>
    </div>
  )
}
