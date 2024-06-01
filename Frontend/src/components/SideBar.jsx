/* eslint-disable react/prop-types */
import '../styles/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAwn, faUserGroup, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function SideBar({setNavItem, setSelectedItem}) {
  const [selected, setSelected] = useState(false);

  const handleMembers = () => {
    setNavItem('members');
    setSelected(false);
  }

  const handleSelected = () => {
    setSelected((prevState) => !prevState);
  }

  return (
    <div className="sidebar-container">
        <div className={!selected ? "item-container 2": "item-container2 2"} onClick={handleMembers}>
            <FontAwesomeIcon icon={faUserGroup} className="icon" />
            <p className="item-title members">Members</p>
        </div>
        {<div className="item-container 1" onClick={() => setNavItem('listOrders')}>
          <FontAwesomeIcon icon={faWheatAwn} className="icon" />
          <p className="item-title schedule">Orders</p>
        </div>}
    </div>
  )
}
