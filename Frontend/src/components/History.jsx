import React, { useState } from 'react'

export default function History() {
  const [select, setSelect] = useState('');
  const [users, setUsers] = useState([]); 
  const [farms, setFarms] = useState([]);
  const [sortBy, setSortBy] = useState(false);
  
  return (
    <div className="history-container">
      <div className="header-history-containers">
        <div className="history-sort-container">
          <button className="history-sort-by-container"></button>
          {sortBy && <div className="history-sort-extent">
            <div className="history-sort-options">
              <p>Default</p>
              <p>Name(asc)</p>
              <p>Crop (asc)</p>
              <p>Availability</p>
            </div>
          </div>}
        </div>
        <input type="text" className="searchHistoryContainer" placeholder="Search..." />
      </div>
      <div className="history-table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Farm Size</th>
              <th>Crop Type</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {/*users && users.map((user) => (
              <tr key={user._id} onClick={() => handleClick(user._id)}>
                <td>{user.name}</td>
                <td>{user.farm ? `${user.farm.farmSize} ha` : 'No Farm'}</td>
                <td>
                  <ul>
                    {user.farm && user.farm.crops ? user.farm.crops.map(crop => (
                      <li key={crop._id}>{crop.cropName}</li>
                    )) : <li>No Crops</li>}
                  </ul>
                </td>
                <td>
                  <ul>
                    {user.farm && user.farm.crops ? user.farm.crops.map(crop => (
                      <li key={crop._id}>{crop.availability} kg</li>
                    )) : <li>-</li>}
                  </ul>
                </td>
            </tr>
          ))*/}
          </tbody>
        </table>
      </div>
    </div>
  )
}
