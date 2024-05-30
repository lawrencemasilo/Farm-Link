import React, { useEffect, useState } from 'react'
import '../styles/History.css'
import { getOrder } from '../services/OrderService';
import { profile } from '../services/ProfileService';

export default function History() {
  const [select, setSelect] = useState('');
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const [orders, setOders] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await profile();
        setUser(userData.data);
        if (user._id) {
          setId(user._id)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user._id) {
          const userOrders = await getOrder(id);
          setOrders(userOrders.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  
  return (
    <div className="history-container">
      <div className="header-history-containers">

      </div>
      <div className="history-table-container">
        <table>
          <thead>
            <tr>
              <th>Crop Name</th>
              <th>Farm Size</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order._id}>
                <td>{order.cropDetails.cropName}</td>
                <td>{order.cropDetails.plotSize}</td>
                <td>{order.quantity}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
