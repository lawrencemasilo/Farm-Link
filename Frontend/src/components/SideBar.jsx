/* eslint-disable react/prop-types */
import '../styles/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAwn, faUserGroup, faGear, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext';
import { SidebarContext } from '../contexts/SideBarContext';
import AutoOrder from '../components/AutoOrder'

export default function SideBar() {
  const { theme } = useContext(ThemeContext);
  const { setNavItem } = useContext(SidebarContext);

  return (
    <div className={`sidebar-container ${theme}`}>
        <div className={`item-container ${theme}`} onClick={() => setNavItem('members')}>
            <FontAwesomeIcon icon={faUserGroup} className="icon" />
            <p className="item-title members">Members</p>
        </div>
        <div className={`item-container ${theme}`} onClick={() => setNavItem('autoOrder')}>
          <FontAwesomeIcon icon={faWheatAwn} className="icon"/>
          <p className="item-title schedule">Auto Order</p>
        </div>
        <div className={`item-container ${theme}`} onClick={() => setNavItem('listOrders')}>
          <FontAwesomeIcon icon={faWheatAwn} className="icon" />
          <p className="item-title schedule">Orders</p>
        </div>
        <div className={`item-container ${theme}`} onClick={() => setNavItem('delivery')}>
          <FontAwesomeIcon icon={faTruckFast} className="icon"/>
          <p className="item-title schedule">Deliveries</p>
        </div>
        <div className={`item-container ${theme}`} onClick={() => setNavItem('settings')}>
          <FontAwesomeIcon icon={faGear} className="icon"/>
          <p className="item-title schedule">Settings</p>
        </div>
    </div>
  )
}

