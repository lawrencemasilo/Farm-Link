import React, { useEffect, useState } from 'react'
import '../styles/ListOrder.css'
import { getUserOrders } from '../services/usersServices.js';

export default function ListOrders() {
  const [selected, setSelected] = useState();
  //const [allOrders, setAllOrders] = useState();

  useEffect(() => {
    const fetchData = async () =>  {
      try {
        const theData = await getUserOrders();
        //console.log(data)
      } catch (error) {
        console.log(error)
      } 
    }
    fetchData();
  }, [])
  return (
    <div className="list-orders-container">
      <div className="list-orders-wrapper">
        <div className="orders-list-title">
          <h1>Orders</h1>
        </div>
        <div className="list-orders-nav-container">
          <div className={selected ? "order-history-container2": "order-history-container"} onClick={() => setSelected('history')}>
            <p className="order-history-title">history</p>
          </div>
        </div>
        <div className="list-order-history-table-container">
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
