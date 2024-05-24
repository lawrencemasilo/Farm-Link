import { useState } from 'react'
import '../styles/Members.css'
import Recent from './Recent';
import Farmers from './Farmers';
import Applications from './Applications';

export default function Members() {
  const [selected, setSelected] = useState('');
  
  return (
    <div className="members-container">
      <div className="members-wrapper">
        <div className="members-title">
          <h1>Members</h1>
        </div>
        <div className="members-nav-container">
          <div className={selected == 'recent' ? "recent-container2" : "recent-container"} onClick={() => setSelected('recent')}>
            <p className="members-recent-title">Recent</p>
          </div>
          <div className={selected == 'farmers' ? "farmers-container2" :"farmers-container"} onClick={() => setSelected('farmers')}>
            <p className="members-farmers-title">Farmers</p>
          </div>
          <div className={selected == 'applications' ? "application-container2" :"application-container"} onClick={() => setSelected('applications')}>
            <p className="members-application-title">Applications</p>
          </div>
        </div>
        {selected == 'recent' && <Recent /> }
        {selected == 'farmers' && <Farmers />}
        {selected == 'applications' && <Applications />}
      </div>
    </div>
  )
}
