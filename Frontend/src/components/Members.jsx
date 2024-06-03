import { useContext, useEffect, useState } from 'react'
import '../styles/Members.css'
import Farmers from './Farmers';
import Farmer from './Farmer';
import { ThemeContext } from '../contexts/ThemeContext';
import Orders from './Orders';
import { SelectedFarmerContext } from '../contexts/SelectedFarmerContext';

export default function Members({ handleOrderClick, showOrderForm, setShowOrderForm}) {
  const [selected, setSelected] = useState('farmers');
  //const [showOrderForm, setShowOrderForm] = useState(false);
  //const [selectedFarmer, setSelectedFarmer] = useState();
  const { theme } = useContext(ThemeContext);
  const { selectedFarmer, setSelectedFarmer } = useContext(SelectedFarmerContext)

  

  return (
    <div className={`members-container ${theme}`}>
      <div className={`members-wrapper  ${theme}`}>
        <div className={`members-title ${theme}`}>
          <h1 className={`members-title-title ${theme}`}>Members</h1>
        </div>
        <div className={`members-nav-container ${theme}`}>
          <div className={selected  ? (`farmers-container2 ${theme}`) : (`farmers-container ${theme}`)} onClick={() => setSelected('farmers')}>
            <p className={`members-farmers-title ${theme}`}>Farmers</p>
          </div>
        </div>
        {selectedFarmer && !showOrderForm && (
          <Farmer
            selectedFarmer={selectedFarmer}
            setSelectedFarmer={setSelectedFarmer}
            onOrderClick={handleOrderClick}
          />
        )}
        {(!selectedFarmer && <Farmers setSelectedFarmer={ setSelectedFarmer } />)}
      </div>
    </div>
  )
}
