import React, { useState } from 'react'
import '../styles/Farmers.css'
import farmersData from '../dataTest'

export default function Farmers({setSelectedFarmer}) {
  const [select, setSelect] = useState('');

  const handleClick = (v) => {
    setSelectedFarmer(v);
  }
  return (
    <div className="farmers-container">
      <div className="header-farmers-containers">
        <input type="text" className="searchFarmersContainer" placeholder="Search..." />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Farm Size</th>
              <th>Crop Type</th>
            </tr>
          </thead>
          <tbody>
            {farmersData.map((farmer) => (
              <tr key={farmer.id} onClick={() => handleClick(farmer.id)}>
                <td>{farmer.id}</td>
                <td>{farmer.name}</td>
                <td>{farmer.farmSize}</td>
                <td>{farmer.cropType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
