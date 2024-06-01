import { useEffect, useState } from 'react'
import '../styles/Members.css'
import Recent from './Recent';
import Farmers from './Farmers';
import Applications from './Applications';
import Farmer from './Farmer';
import History from './History';
import Details from './Details';

export default function Profile() {
  const [selected, setSelected] = useState('history');
  const [selectedFarmer, setSelectedFarmer] = useState();

  return (
    <div className="members-container">
      <div className="members-wrapper">
        <div className="members-title">
          <h1>Profile</h1>
        </div>
        <div className="members-nav-container">
          {<div className={selected == 'history' ? "recent-container2" : "recent-container"} onClick={() => setSelected('history')}>
            <p className="members-recent-title">History</p>
          </div>}
          {<div className={selected == 'details' ? "application-container2" :"application-container"} onClick={() => setSelected('details')}>
            <p className="members-application-title">Details</p>
          </div>}
        </div>
        {selected == 'history' && <History />}
        {selected == 'details' && <Details />}
      </div>
    </div>
  )
}
