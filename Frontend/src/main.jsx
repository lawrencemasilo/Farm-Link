import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext';
import { SideBarProvider } from './contexts/SideBarContext.jsx';
import { SelectedFarmerProvider } from './contexts/SelectedFarmerContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <SelectedFarmerProvider>
      <SideBarProvider>
        <ThemeProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ThemeProvider>
      </SideBarProvider>
    </SelectedFarmerProvider>
  </UserProvider>
  
  
)
