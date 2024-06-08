import React, { useState } from 'react';
import '../styles/PlaceDelivery.css'
import Schedule from './Schedule'
import MapBox from './MapBox'
import Map from './Map';

export default function PlaceDelivery() {

  return (
    <div className="place-delivery-container">
      {<Map />}
    </div>
  )
}
