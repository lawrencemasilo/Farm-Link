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
            {/*<div className="drop-down-container">
                <FontAwesomeIcon icon={faCaretDown} className={!selected ?"dropDownIcon": "dropDownIcon2"} />
            </div>*/}
        </div>
        <div className="item-container 1" onClick={() => setNavItem('order')}>
          <FontAwesomeIcon icon={faWheatAwn} className="icon" />
          <p className="item-title schedule">Order</p>
        </div>
        {/*<div className="item-container 1" onClick={() => setNavItem('place delivery')}>
          <FontAwesomeIcon icon={faCalendarDays} className="icon" />
          <p className="item-title schedule">Place Delivery</p>
          </div>*/}
    
        {/*selected && <div className="item-container m1" onClick={() => setSelectedItem('recent')}>
            <p className="item-title recent">Recent</p>
        </div>*/}
        {/*selected && <div className="item-container m2" onClick={() => setSelectedItem('farmers')}>
            <p className="item-title farmers">Farmers</p>
        </div>*/}
        {/*selected && <div className="item-container m3" onClick={() => setSelectedItem('applications')}>
            <p className="item-title applications">Applications</p>
        </div>*/}
    </div>
  )
}
