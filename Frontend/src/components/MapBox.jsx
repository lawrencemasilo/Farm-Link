import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';


/*This component is not used for the route planning, Google api is used.
  The api in use can be found in the Map() component './Map.jsx'.
*/

mapboxgl.accessToken = 'pk.eyJ1IjoibmVvMSIsImEiOiJjbHdndmU3YngwOHV3MmlteTltNjh6Z2RxIn0.p3-OSDB2fNHZb2Zbu1nGmg';

export default function MapBox({ origin, destination, waypoints }) {
    const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [8.681495, 49.41461],
      zoom: 13,
    });

    map.on('load', () => {
      // Add map controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Setup directions
      const directionsClient = MapboxDirections({ accessToken: mapboxgl.accessToken });

      directionsClient.getDirections({
        waypoints: [
          { coordinates: [8.681495, 49.41461] },
          { coordinates: [8.687872, 49.420318] }
        ]
      })
      .send()
      .then(response => {
        const directions = response.body.routes[0];
        const coordinates = directions.geometry.coordinates;

        // Add the route as a layer on the map
        map.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': coordinates
            }
          }
        });

        map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#888',
            'line-width': 8
          }
        });

        // Fit map to route bounds
        const bounds = coordinates.reduce(function (bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, {
          padding: {top: 20, bottom:20, left: 20, right: 20}
        });
      })
      .catch(error => console.error('Error fetching directions:', error));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
};