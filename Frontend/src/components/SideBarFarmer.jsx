/* eslint-disable react/prop-types */
import '../styles/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAwn, faUserGroup, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function SideBarFarmer({setNavItem, setSelectedItem}) {
  const [selected, setSelected] = useState(false);

  const handleProfile = () => {
    setNavItem('profile');
    setSelected(false);
  }
  
  const handleSelected = () => {
    setSelected((prevState) => !prevState);
  }
  return (
    <div className="sidebar-container">
        <div className={!selected ? "item-container 2 sidebarF": "item-container2 2"} onClick={handleProfile}>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <p className="item-title profile">Profile</p>
        </div>
        <div className="item-container 1" onClick={() => setNavItem('produce')}>
          <FontAwesomeIcon icon={faWheatAwn} className="icon" />
          <p className="item-title produce">Produce</p>
        </div>
        {/*<div className="item-container 1" onClick={() => setNavItem('place delivery')}>
          <FontAwesomeIcon icon={faCalendarDays} className="icon" />
          <p className="item-title schedule">Place Delivery</p>
        </div>*/}
    </div>
  )
}
