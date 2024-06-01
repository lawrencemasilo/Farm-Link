import React, { useEffect, useState } from 'react'
import '../styles/History.css'
import { getOrder, updateOrderStatus } from '../services/OrderService';

export default function History() {
  const [select, setSelect] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const farmData = await getOrder();
        console.log('farmData', farmData);

        const {crops} = farmData.data;
        if (Array.isArray(crops)) {
            const extractedOrders = crops.flatMap(crop =>
            crop.orders.map(order => ({
              _id: order._id,
              cropName: crop.cropName,
              quantity: order.quantity,
              date: order.createdAt,
              status: order.status || 'pending'
            }))
          );
          setOrders(extractedOrders);
        } else {
          console.error('crops is not an array:', crops);
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchOrders();
  }, []);

  const handleDispatch = async (index) => {
    const order = orders[index];
    const confirmed = window.confirm('Are you sure this order is dispatched?')
    if (confirmed) {
      try {
        await updateOrderStatus(order._id, 'dispatched');
        setOrders(prevOrders => {
          const newOrders = [...prevOrders];
          newOrders[index].status = 'dispatched';
          return newOrders;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="history-container">
      <div className="header-history-containers">

      </div>
      <div className="history-table-container">
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
            {orders && orders.map((order, index) => (
              <tr key={index}>
                <td>{order.cropName}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                    <button 
                      onClick={() => handleDispatch(index)}
                      disabled={order.status === 'dispatched'}
                    >
                      Dispatch
                    </button>
                    <button 
                      disabled
                      >
                        {order.status === 'dispatched' ? 'Dispatched' : 'Pending'}
                    </button>
                </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
