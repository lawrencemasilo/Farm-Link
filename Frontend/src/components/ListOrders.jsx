import React, { useContext, useEffect, useState } from 'react'
import '../styles/ListOrder.css'
import '../styles/History.css'
import { getOrders, updateOrderStatus } from '../services/OrderService';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ListOrders() {
  const [selected, setSelected] = useState();
  const [orders, setOrders] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () =>  {
      try {
        const response = await getOrders();
        setOrders(response.orders);
      } catch (error) {
        console.log(error)
      } 
    }
    fetchData();
  }, []);

  const handleReceive = async (orderId, index) => {
    const order = orders[index];
    const confirmed = window.confirm('Have you received this order?')
    if (confirmed) {
      try {
        console.log(`Updating order with ID: ${orderId}`);
        const updatedOrder = await updateOrderStatus(orderId, 'received');
        console.log('Order updated:', updatedOrder);
        setOrders(prevOrders => {
          const newOrders = [...prevOrders];
          newOrders[index].status = 'received';
          return newOrders;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

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
        <div className={`list-order-history-table-container ${theme}`}>
          <table>
            <thead>
                <tr>
                <th>Farmer</th>
                <th>Farm Name</th>
                <th>Crop Name</th>
                <th>Quantity(kg)</th>
                <th>Date Issued</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.farmerDetails.name}</td>
                    <td>{order.farmDetails.name}</td>
                    <td>{order.cropDetails.cropName}</td>
                    <td>{order.quantity}</td>
                    <td>{new Date(order.dateIssued).toLocaleDateString()}</td>
                    <td>
                      {order.status === 'dispatched' && (
                        <button 
                          onClick={() => handleReceive(order._id, index)}
                          className="history-dispatch-btn"
                        >
                          Dispatched
                        </button>
                      )}
                       {order.status !== 'dispatched' && 
                       <button 
                        className={
                          order.status === 'received' ? "history-dispatched-btn" :
                          order.status === 'pending' ?  "history-panding-btn": ''
                        }
                          >
                        {order.status}
                        </button>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
