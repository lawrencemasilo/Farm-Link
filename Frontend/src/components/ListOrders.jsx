import React, { useContext, useEffect, useState } from 'react'
import '../styles/ListOrder.css'
import { getUserOrders } from '../services/usersServices.js';
import { ThemeContext } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDesc } from '@fortawesome/free-solid-svg-icons'

export default function ListOrders() {
  const [selected, setSelected] = useState();
  //const [allOrders, setAllOrders] = useState();
  const { theme } = useContext(ThemeContext);
  const [sortBy, setSortBy] = useState(false);

  return (
    <div className="list-orders-container">
      <div className="list-orders-wrapper">
        <div className={`orders-list-title ${theme}`}>
          <h1>Orders</h1>
        </div>
        <div className={`list-orders-nav-container ${theme}`}>
          <div className={`order-history-container2 ${theme}`} onClick={() => setSelected('history')}>
            <p className={`order-history-title ${theme}`}>History</p>
          </div>
        </div>
        <div className="list-sort-wrapper">
          <div className="list-order-sort-container">
            <div className="list-order-sort-by-btn-contain">
              <button className={`list-order-sort-by-container ${theme}`} onClick={() => setSortBy((prev) => !prev)}>Sort By <span className="sortIcon"><FontAwesomeIcon icon={faSort} /></span></button>
            </div>
            {sortBy && <div className={`list-order-sort-extent ${theme}`}>
                <div className={`list-order-sort-options ${theme}`}>
                  <p>Default</p>
                  <p>Name(asc)</p>
                  <p>Crop (asc)</p>
                  <p>Availability</p>
                </div>
            </div>}
          </div>
        </div>
        <div className={`list-order-history-table-container ${theme}`}>
          <table>
            <thead>
                <tr>
                <th>Crop Name</th>
                <th>Quantity(kg)</th>
                <th>Date Issued</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {/*orders && orders.map((order, index) => (
                <tr key={index}>
                    <td>{order.cropName}</td>
                    <td>{order.quantity}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                    {order.status != 'dispatched' &&
                        <button className="history-dispatch-btn"
                        onClick={() => handleDispatch(index)}
                        disabled={order.status === 'dispatched'}
                        >
                        Dispatch
                        </button>}
                    {order.status === 'dispatched' &&
                        <button className="history-dispatched-btn"
                        disabled
                        >
                            {order.status === 'dispatched' && 'Dispatched'}
                        </button>}
                    </td>
                </tr>
                ))*/}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
