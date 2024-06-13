// import React, { useRef, useState, useEffect } from 'react';
// import '../styles/Schedule.css'
// import '../styles/Map.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretDown, faTruckFast, faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
// import { useJsApiLoader, GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, Autocomplete } from '@react-google-maps/api';

// /*WARNING to anyone working on this file. It took me 2 days, 8 cups of coffee, reading documentation,
//   Youtube tutorials, and 3 different API service providers to get this map routing feature somewhat
//   working, so if you so happen to break something and can't fix it. Please do me a favour and unalive yourself before I DO!!! */

// /* HAPPY CODING!!! */


// //Handles Map styles
// const containerStyle = {
//   width: '100%',
//   height: '80%',
//   "border-radius": '20px',
//   "margin-right": '40px'
// };

// //Coordinates of where the map initially loads up
// const center = {
//   lat: -26.19676443081683,
//   lng: 28.064208020288774,
// };

// export default function Map() {
//   const [map, setMap] = useState(null);
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [waypoints, setWaypoints] = useState([]);
//   const [addStop, setAddStop] = useState(false);
//   const [numStops, setNumStops] = useState(0);
//   const [directionsResponse, setDirectionsResponse] = useState('');
//   const [distance, setDistance] = useState('');
//   const [durationResponse, setDurationResponse] = useState('');

//   const originRef = useRef();
//   const waypointsRefs = useRef([]);
//   const destinationRef = useRef();

//   /*(Starts here) Handles the Configuration of the api( not the Map configures itself, that's below...)*/
//   const { isLoaded } = useJsApiLoader({
//     /*loads the Map api and addtional services, using the key*/
//     googleMapsApiKey: '',
//     libraries: ['places'],
//   });

//   if (!isLoaded) {
//     /*Handle situation where the api has not been loaded yet*/
//     return <div>Loading...</div>;
//   }

//   async function calculateRoute() {
//     /*Calcutates the Route*/
//     if (originRef.current.value === '' || destinationRef.current.value === '') {
//       return;
//     }

//     const directionsService = new google.maps.DirectionsService();

//     const waypointsArray = waypointsRefs.current.map(ref => {
//       if (ref.current && ref.current.value) {
//         return {
//           location: ref.current.value,
//           stopover: true,
//         };
//       }
//       return null;
//     }).filter(waypoint => waypoint !== null);

//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: google.maps.TravelMode.DRIVING,
//       waypoints: waypointsArray,
//     });

//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDurationResponse(results.routes[0].legs[0].duration.text);
//     clearRoute()
//   }

//   const clearRoute = () => {
//     setDirectionsResponse(null);
//     setDistance('');
//     setDurationResponse('');
//     originRef.current.value = '';
//     destinationRef.current.value = '';
//   };

//   /*Api configurations end here!!! */


//   /*(Starts here) Handles input values*/

//   const handleAddWaypoint = () => {
//     if (waypoints.length < 3) {
//       setWaypoints([...waypoints, '']);
//       waypointsRefs.current.push(React.createRef());
//       setNumStops((prev) => prev + 1);
//       setAddStop(true);
//     }
//   };

//   const handleWaypointChange = (index, value) => {
//     const newWaypoints = [...waypoints];
//     newWaypoints[index] = value;
//     setWaypoints(newWaypoints);
//   };

//   /*(Ends here) handling of input values*/

//   return (
//     <div className="map-input-container">
//       <div className="schedule-container">
//         <div className={`planner-container${numStops + 1}`}>
//           <div className="planner-title-container">
//             <h1 className="planner-title">Plan Collection</h1>
//           </div>
//           <div className="origin-container">
//             <Autocomplete>
//               <input
//                 type="text"
//                 className={addStop ? "pickup origin-pickup2" : "pickup"}
//                 placeholder="Pickup location"
//                 ref={originRef}
//                 onChange={(e) => setOrigin(e.target.value)}
//               />
//             </Autocomplete>
//           </div>
//           {addStop && (
//             <div className="waypoint-container">
//               {/*This block handles the additional waypoints(stops)*/}
//               {waypointsRefs.current.map((ref, index) => (
//                 index < 4 && (
//                   <Autocomplete key={index}>
//                     <input
//                       className="pickup waypoint-input"
//                       ref={ref}
//                       type="text"
//                       placeholder={`Waypoint ${index + 1}`}
//                     />
//                   </Autocomplete>
//                 )
//               ))}
//             </div>
//           )}
//           {addStop ? (
//             <div className="destination-container">
//               <Autocomplete>
//                 <input
//                   type="text"
//                   className={addStop ? "pickup second-pickup2" : "pickup second-pickup"}
//                   placeholder="Destination"
//                   ref={destinationRef}
//                   onChange={(e) => setDestination(e.target.value)}
//                 />
//               </Autocomplete>
//               {numStops < 3 && (
//                 <FontAwesomeIcon
//                   icon={faCirclePlus}
//                   className={addStop ? "addIcon2" : "addIcon"}
//                   onClick={handleAddWaypoint}
//                 />
//               )}
//             </div>
//           ) : (
//             <div className="destination-container">
//               <Autocomplete>
//                 <input
//                   type="text"
//                   className={addStop ? "pickup second-pickup2" : "pickup second-pickup"}
//                   placeholder="Destination"
//                   ref={destinationRef}
//                   onChange={(e) => setDestination(e.target.value)}
//                 />
//               </Autocomplete>
//               <FontAwesomeIcon
//                 icon={faCirclePlus}
//                 className={addStop ? "addIcon2" : "addIcon"}
//                 onClick={handleAddWaypoint}
//               />
//             </div>
//           )}
//           <div className="pickup-time-container">
//             <FontAwesomeIcon icon={faTruckFast} className="truckIcon" />
//             <p className="pickup-time">Pickup Now</p>
//             <FontAwesomeIcon icon={faCaretDown} className="pickup-arrowIcon" />
//           </div>
//           <div className="schedule-btn-container">
//             <button className="schedule-submit-btn" onClick={calculateRoute}>Schedule</button>
//           </div>
//         </div>
//       </div>
//       {/*Map visuals configures below*/}
//       <GoogleMap
//         center={center}
//         zoom={10}
//         mapContainerStyle={containerStyle}
//         options={{ streetViewControl: true }}
//         onLoad={(map) => setMap(map)}
//       >
//         {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
//       </GoogleMap>
//     </div>
//   );
// }


import React, { useRef, useState, useEffect } from 'react';
import '../styles/Schedule.css'
import '../styles/Map.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faTruckFast, faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useJsApiLoader, GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, Autocomplete } from '@react-google-maps/api';
import { fetchRoute } from '../services/routePlannerservice';

//Handles Map styles
const containerStyle = {
  width: '100%',
  height: '80%',
  "borderRadius": '20px',
  "marginRight": '40px'
};

//Coordinates of where the map initially loads up
const center = {
  lat: -33.963700,
  lng: 18.575237,
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [farmNames, setFarmNames] = useState(['', '', '', '']);
  const [route, setRoute] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const { isLoaded } = useJsApiLoader({
    /*loads the Map api and addtional services, using the key*/
    googleMapsApiKey: '',
    libraries: ['places'],
  });

  if (!isLoaded) {
    /*Handle situation where the api has not been loaded yet*/
    return <div>Loading...</div>;
  }
  
  const handleAddFarm = () => {
    setFarmNames([...farmNames, '']);
  }

  const handleFarmNameChange = (index, value) => {
    const newFarmNames = [...farmNames];
    newFarmNames[index] = value;
    setFarmNames(newFarmNames);
  }

  const calculateRoute = async () => {
    if (farmNames.some(name => name === '')) {
      return;
    }

    try {
      const data = await fetchRoute(farmNames);

      if (data.success) {
        setRoute(data.route);
        const waypoints = data.route.slice(1, -1).map(index => ({
          location: {
            lat: data.farms[index].coordinates.latitude,
            lng: data.farms[index].coordinates.longitude,
          },
          stopover: true,
        }));

        const directionsService = new google.maps.DirectionsService();
        const directionsResult = await directionsService.route({
          origin: {
            lat: data.farms[0].coordinates.latitude,
            lng: data.farms[0].coordinates.longitude,
          },
          destination: {
            lat: data.farms[0].coordinates.latitude,
            lng: data.farms[0].coordinates.longitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints,

        });

        setDirectionsResponse(directionsResult);
      } else {
        console.error('Failed to fetch route:', data.error);
      }

    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  return (
    <div className="map-input-container">
       <div className="schedule-container">
         <div className={`planner-container`}>
          <div className="planner-title-container">
             <h1 className="planner-title">Plan Collection</h1>
           </div>
           {farmNames.map((name, index) => (
              <div className="farm-name-container">
              <Autocomplete>
                  <input
                    type="text"
                    className="pickup"
                    placeholder={`Farm ${index + 1}`}
                    value={name}
                    onChange={(e) => handleFarmNameChange(index, e.target.value)}
                  />
                </Autocomplete>
              </div>
           ))}
           <FontAwesomeIcon 
            icon={faCirclePlus}
            className="addIcon"
            onClick={handleAddFarm}
           />
          <div className="schedule-btn-container">
            <button className="schedule-submit-btn" onClick={calculateRoute}>Schedule</button>
          </div>
        </div>
      </div>
      {/*Map visuals configures below*/}
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={containerStyle}
        options={{ streetViewControl: true }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </div>
  );
}