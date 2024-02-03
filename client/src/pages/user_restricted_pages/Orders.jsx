import axios from "axios";
import { useEffect, useState } from "react"
import { getCompletedOrdersSummary } from "../../utils/orderSummaryGenerator";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    var userInfo = JSON.parse(localStorage.getItem('user'))._id;
    axios.get(`http://localhost:4242/api/v1/cement-swift/cart/list?customerId=${userInfo}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.items);
          var orderSummary = getCompletedOrdersSummary(response.data.items);
          console.log(orderSummary);
          setOrders(orderSummary);  
        }
      })
      .catch((error) => {
        console.log('Error :', error);
      });

  }, [])

  return (
    <div className="flex flex-col justify-start items-start gap-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      <div className="list_of_orders flex flex-col border-1 border-gray-400 w-full">
        {orders.length === 0 && <span className="">You do not have orders yet.</span>}
        {orders.length !== 0 && orders.map((order, index) => (
          <div key={index} className="orderItem">
            <div className="flex justify-between items-center">
              <strong>Order {order.orderCode}</strong>
              <Link to={`/account/order/${order.orderCode}`} className="text-slate-600">View Order</Link>
            </div>
            <p>Total: {order.total}</p>
          <small>Ordered On: {new Date(order.orderedOn).toDateString()} - {new Date(order.orderedOn).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders