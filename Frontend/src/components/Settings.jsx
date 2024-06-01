import React, { useContext } from 'react';
import '../styles/Settings.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`settings-containers ${theme}`}>
      <div className="settings-wrapper">
      <div className={`settings-title ${theme}`}>
          <h1 className={`settings-title-title ${theme}`}>Settings</h1>
        </div>
        <div className={`settings-nav-container ${theme}`}>
          <div className= {`settings-container2 ${theme}`}>
            <p className={`settings-display-title ${theme}`}>Display</p>
          </div>
        </div>
        <div className={`toggle-btn-container ${theme}`}>
          <p>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</p>
          {theme === 'light' ? 
            <FontAwesomeIcon icon={faToggleOff} className={`toggle-btn-icon ${theme}`} onClick={toggleTheme} />: 
            <FontAwesomeIcon icon={faToggleOn} className={`toggle-btn-icon ${theme}`} onClick={toggleTheme}/>
          }
          {/*<button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>*/}
        </div>
      </div>
    </div>
  )
}
