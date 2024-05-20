import '../styles/Services.css'

export default function Services() {
  return (
    <div className="services-container">
        <div className="description-container">
            <h1 className="services-title">Our Service</h1>
        </div>
        <div className="services">
            <div className="service">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faRectangleList} />
                </div>
                <h1 className="service-title">Manage Applications</h1>
            </div>
            <div className="service">
                <div className="icon-container"></div>
                <h1 className="service-title">Track Produce Intake</h1>
            </div>
            <div className="service">
                <div className="icon-container"></div>
                <h1 className="service-title">Route Managemet</h1>
            </div>
            <div className="service">
                <div className="icon-container"></div>
                <h1 className="service-title">Placeholder</h1>
            </div>
        </div>
    </div>
  )
}
