import '../styles/Schedule.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faTruckFast, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Map from './Map'

export default function Schedule() {
  return (
    <div className="schedule-container">
        <div className="planner-container">
            <div className="planner-title-container">
                <h1 className="planner-title">Plan Collection</h1>
            </div>
            <input type="text" className="pickup" placeholder="Pickup location"/>
            <div className="second-pickup-container">
                <input type="text" className="pickup second-pickup" placeholder="Pickup location"/>
                <FontAwesomeIcon icon={faCirclePlus} className="addIcon"/>
            </div>
            <div className="pickup-time-container">
                <FontAwesomeIcon icon={faTruckFast} className="truckIcon"/>
                <p className="pickup-time">Pickup Now</p>
                <FontAwesomeIcon icon={faCaretDown} className="pickup-arrowIcon"/>
            </div>
            <div className="assign-person-container">
                <p className="assign-person">For</p>
                <FontAwesomeIcon icon={faCaretDown} className="assign-arrowIcon"/>
            </div>
            <div className="schedule-btn-container">
                <p className="schedule-btn-title">Schedule</p>
            </div>
        </div>
        <div className="map-container">
            <Map />
        </div>
    </div>
  )
}
