import React, { useState } from 'react';
import '../styles/Schedule.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faTruckFast, faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Map from './Map'
import MapBox from './MapBox'
import { Autocomplete } from '@react-google-maps/api';

/*This component is not rendered any where */


export default function Schedule({ onSubmit }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [addStop, setAddStop] = useState(false);
  
  const handleAddWaypoint = () => {
    if (waypoints.length < 4) {
      setWaypoints([...waypoints, '']);
    }
  };
  
  const handleWaypointChange = (index, value) => {
    const newWaypoints = [...waypoints];
    newWaypoints[index] = value;
    setWaypoints(newWaypoints);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ origin, destination, waypoints });
  };


  return (
    <div className="schedule-container">
        <form onSubmit={handleSubmit} className="planner-container">
            <div className="planner-title-container">
                <h1 className="planner-title">Plan Collection</h1>
            </div>
            <div className="origin-container">
                <Autocomplete>
                    <input type="text" className={addStop ? "pickup origin-pickup2": "pickup"} placeholder="Pickup location" onChange={(e) => setOrigin(e.target.value)} />
                </Autocomplete>
                
            </div>
            {addStop && <div className="waypoint-container">
                {waypoints.map((waypoint, index) => (
                ( index < 4 && 
                    <input
                    className="pickup waypoint-input"
                    key={index}
                    type="text"
                    value={waypoint}
                    onChange={(e) => handleWaypointChange(index, e.target.value)}
                />)
                ))}
                {/*<FontAwesomeIcon icon={faCircleXmark} className="addIcon" />
                <button type="button" onClick={handleAddWaypoint}>Add Waypoint</button>*/}
            </div>}
            {addStop ? <div className="destination-container">
                <input type="text" className={addStop ? "pickup second-pickup2": "pickup second-pickup"} placeholder="" onChange={(e) => setDestination(e.target.value)}/>
                {numStops < 4 && <FontAwesomeIcon icon={faCirclePlus} className={addStop ?"addIcon2": "addIcon"} onClick={handleAddWaypoint}/>}
            </div>:
            <div className="destination-container">
                <input type="text" className={addStop ? "pickup second-pickup2": "pickup second-pickup"} placeholder="Destination" onChange={(e) => setDestination(e.target.value)}/>
                <FontAwesomeIcon icon={faCirclePlus} className={addStop ?"addIcon2": "addIcon"} onClick={handleAddWaypoint}/>
            </div>}
            <div className="pickup-time-container">
                <FontAwesomeIcon icon={faTruckFast} className="truckIcon"/>
                <p className="pickup-time">Pickup Now</p>
                <FontAwesomeIcon icon={faCaretDown} className="pickup-arrowIcon"/>
            </div>
            
            {/*<div className="assign-person-container">
                <p className="assign-person">For</p>
                <FontAwesomeIcon icon={faCaretDown} className="assign-arrowIcon"/>
            </div*/}
            <div className="schedule-btn-container">
                <button type="submit" className="schedule-submit-btn">Schedule</button>
            </div>
        </form>
        { /*<div className="map-container">
            <Map 
              origin={routeDetails.origin}
              destination={routeDetails.destination}
              waypoints={routeDetails.waypoints}
            />
        </div>*/
    }
    </div>
  )
}
