import '../styles/Services.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature, faChartSimple, faBoxesPacking } from '@fortawesome/free-solid-svg-icons'

export default function Services() {
  return (
    <div className="services-container" id="services">
        <div className="description-container">
            <h1 className="services-title">Our Service</h1>
        </div>
        <div className="services">
            <div className="service">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faFileSignature} />
                </div>
                <h1 className="service-title">Manage Orders</h1>
            </div>
            <div className="service">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faChartSimple} />
                </div>
                <h1 className="service-title">Track Produce Intake</h1>
            </div>
            <div className="service">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faBoxesPacking} />
                </div>
                <h1 className="service-title">supplier Management</h1>
            </div>
        </div>
    </div>
  )
}
