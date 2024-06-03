/* eslint-disable react/prop-types */
import '../styles/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAwn, faUserGroup, faCalendarDays, faGear } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext';
import { SidebarContext } from '../contexts/SideBarContext';

export default function SideBar() {
  const [selected, setSelected] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { navItem, setNavItem } = useContext(SidebarContext);

  const handleMembers = () => {
    setNavItem('members');
    setSelected(false);
  }

  const handleSelected = () => {
    setSelected((prevState) => !prevState);
  }

  return (
    <div className={`sidebar-container ${theme}`}>
        {/*<div className={!selected ? (`item-container ${theme}`): (`item-container2 ${theme} 2`)} onClick={() => handleMembers}>
            <FontAwesomeIcon icon={faUserGroup} className="icon" />
            <p className="item-title members">Members</p>
        </div>*/}
        <div className={`item-container ${theme}`} onClick={() => setNavItem('members')}>
            <FontAwesomeIcon icon={faUserGroup} className="icon" />
            <p className="item-title members">Members</p>
        </div>
        <div className={`item-container ${theme}`} onClick={() => setNavItem('listOrders')}>
          <FontAwesomeIcon icon={faWheatAwn} className="icon" />
          <p className="item-title schedule">Orders</p>
        </div>
        <div className={`sidebar-settings-wrapper ${theme}`}>
          <div className={`item-container-settings ${theme} item-container ${theme}`} onClick={() => setNavItem('settings')}>
            <FontAwesomeIcon icon={faGear} className="icon"/>
            <p className="item-title schedule">Settings</p>
          </div>
        </div>
    </div>
  )
}
