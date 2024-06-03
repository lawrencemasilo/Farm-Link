import { useContext, useEffect, useState } from 'react'
import '../styles/Members.css'
import Recent from './Recent';
import Farmers from './Farmers';
import Applications from './Applications';
import Farmer from './Farmer';
import History from './History';
import Details from './Details';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedFarmerContext } from '../contexts/SelectedFarmerContext';

export default function Profile() {
  const [selected, setSelected] = useState('history');
  const [selectedFarmer, setSelectedFarmer] = useState();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`members-container ${theme}`}>
      <div className={`members-wrapper ${theme}`}>
        <div className={`members-title ${theme}`}>
          <h1 className={`members-title-title ${theme}`}>Profile</h1>
        </div>
        <div className={`members-nav-container ${theme}`}>
          {<div className={selected == 'history' ? (`recent-container2 ${theme}`) : (`recent-container ${theme}`)} onClick={() => setSelected('history')}>
            <p className={`members-recent-title ${theme}`}>History</p>
          </div>}
          {<div className={selected == 'details' ? (`application-container2 ${theme}`) : (`application-container ${theme}`)} onClick={() => setSelected('details')}>
            <p className={`members-application-title ${theme}`}>Details</p>
          </div>}
        </div>
        {selected == 'history' && <History />}
        {selected == 'details' && <Details />}
      </div>
    </div>
  )
}
