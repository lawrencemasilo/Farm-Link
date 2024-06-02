import React, { useContext, useEffect, useState } from 'react'
import '../styles/Farmers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { usersData, farmerDatails } from '../services/farmerService';
import { ThemeContext } from '../contexts/ThemeContext';


export default function Farmers({setSelectedFarmer}) {
  const [select, setSelect] = useState('');
  const [users, setUsers] = useState([]); 
  const [farms, setFarms] = useState([]);
  const [sortBy, setSortBy] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleClick = async (userId) => {
    try {
      const data = await farmerDatails(userId);
      setSelectedFarmer(data.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  //attempts to fetch the data and store it in farmers state
  
    const fetchData = async () => {
      try {
        const query = {};
        if (searchTerm) query.search = searchTerm;
        if (sortOption) query.sort = sortOption;
        const data = await usersData(query);
        setUsers(data.data);
      } catch(err) {
        console.log(err);
      }
    };
  useEffect(() => {
    fetchData();
  }, [searchTerm, sortOption]);

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    setSortBy(false);
  }

  return (
    <div className={`farmers-container ${theme}`}>
      <div className={`header-farmers-containers ${theme}`}>
        <div className="sort-container">
          <button className={`sort-by-container ${theme}`} onClick={() => setSortBy((prev) => !prev)}>Sort By <span className="sortIcon"><FontAwesomeIcon icon={faSort} /></span></button>
          {sortBy && (
            <div className={`sort-extent ${theme}`}>
              <div className={`sort-options ${theme}`}>
                <p onClick={() => handleSortOptionChange('')}>Default</p>
                <p onClick={() => handleSortOptionChange('name')}>Name(asc)</p>
                <p onClick={() => handleSortOptionChange('farm.crops.cropName')}>Crop (asc)</p>
                <p onClick={() => handleSortOptionChange('farm.crops.availability')}>Availability</p>
              </div>
          </div>
        )}
        </div>
        <input 
          type="text"
          className="searchFarmersContainer"
          placeholder="Search..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={`table-container ${theme}`}>
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
            {users && users.map((user) => (
              <tr key={user._id} className={`table-tr-container ${theme}`} onClick={() => handleClick(user._id)}>
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
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
