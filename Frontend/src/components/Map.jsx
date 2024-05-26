import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  "border-radius": '20px'
};

const center = {
  lat: -26.19676443081683,
  lng: 28.064208020288774,
};

function Map() {
    return (
      <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    );
}


export default Map;
