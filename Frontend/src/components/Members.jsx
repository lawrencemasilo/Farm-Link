import { useEffect, useState } from 'react'
import '../styles/Members.css'
import Recent from './Recent';
import Farmers from './Farmers';
import Applications from './Applications';
import Farmer from './Farmer';

export default function Members() {
  const [selected, setSelected] = useState('farmers');
  const [selectedFarmer, setSelectedFarmer] = useState();
  
  /*useEffect(() => {
    if (selectedItem === 'recent') {
      setSelected('recent');
    } else if (selectedItem === 'applications') {
      setSelected('applications');
    } else if (selectedItem === 'farmers') {
      setSelected('farmers');
    }
  }, [selectedItem])*/
 

  return (
    <div className="members-container">
      <div className="members-wrapper">
        <div className="members-title">
          <h1>Members</h1>
        </div>
        <div className="members-nav-container">
          {/*<div className={selected == 'recent' ? "recent-container2" : "recent-container"} onClick={() => setSelected('recent')}>
            <p className="members-recent-title">Recent</p>
          </div>*/}
          <div className={selected  ? "farmers-container2" :"farmers-container"} onClick={() => setSelected('farmers')}>
            <p className="members-farmers-title">Farmers</p>
          </div>
          {/*<div className={selected == 'applications' ? "application-container2" :"application-container"} onClick={() => setSelected('applications')}>
            <p className="members-application-title">Applications</p>
          </div>*/}
        </div>
        {/*selected == 'recent' && <Recent /> */}
        {/*selected == 'farmers' ? (selectedFarmer ? <Farmer selectedFarmer={selectedFarmer} setSelectedFarmer={setSelectedFarmer} />
          : (selected == 'farmers' && <Farmers setSelectedFarmer={ setSelectedFarmer } />)): ( selected == 'applications' && <Applications />)*/}
        {selectedFarmer ? <Farmer selectedFarmer={selectedFarmer} setSelectedFarmer={setSelectedFarmer} />
          : (selected && <Farmers setSelectedFarmer={ setSelectedFarmer } />)}
      </div>
    </div>
  )
}
