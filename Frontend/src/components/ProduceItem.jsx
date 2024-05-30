import React, { useEffect, useState } from 'react'
import '../styles/ProduceItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { addCrop } from '../services/ProduceService'

export default function ProduceItem({ crop, quantityL, selectedPlantDate, selectedHarvestDate, plot}) {
  //const [quantityLo, setQuantitylO] = useState(0)]
  //cropName, plantDate, harvestDate, produceYield, plotSize, availability
  const [cropName , setCropName] = useState(crop);
  const [plantDate, setPlantDate] = useState(selectedPlantDate);
  const [harvestDate, setHarvestDate] = useState(selectedHarvestDate);
  const [produceYield, setProduceYield] = useState(1);
  const [plotSize, setPlotSize] = useState(plot);
  const [availability, setAvailability] = useState(quantityL);

  useEffect(() => {
    //Sends request to store crop data
    const postData = async () => {
      try {
        const data = await addCrop({cropName, plantDate, harvestDate, produceYield, plotSize, availability})
        console.log('crop sent')
      } catch (err) {
        console.log(err.message);
      }
    }
    postData();
  }, [])
  

  return (
    <div className="produceItem-container">
      <div className="produceItem">
        <FontAwesomeIcon icon={faAngleUp} className="produce-arrowIcon" />
        <div className="produceName">
          <p>{crop}</p>
        </div>
        <div className="produceQuantityContainer">
          <div className="produceQuantityInput">{quantityL && quantityL}</div> 
        </div>
      </div>
    </div>
  )
}
