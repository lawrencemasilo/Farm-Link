import { useContext, useEffect, useState } from 'react'
import '../styles/History.css'
import { getOrder, updateOrderStatus } from '../services/OrderService';
import { ThemeContext } from '../contexts/ThemeContext';

export default function History() {
  const [select, setSelect] = useState('');
  const [orders, setOrders] = useState([]);
  const [isDispatched, setIsDispatched] = useState(false)
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const farmData = await getOrder();
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
          setIsDispatched(true)
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
      <div className={`history-table-container ${theme}`}>
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
              <tr key={index} className={`history-table-tr ${theme}`}>
                <td>{order.cropName}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  {order.status != 'dispatched' &&
                    <button className={`history-dispatch-btn ${theme}`}
                      onClick={() => handleDispatch(index)}
                      disabled={order.status === 'dispatched'}
                    >
                      Dispatch
                    </button>}
                  {order.status === 'dispatched' &&
                    <button className={`history-dispatched-btn  ${theme}`}
                      disabled
                      >
                        {order.status === 'dispatched' && 'Dispatched'}
                    </button>}
                </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
