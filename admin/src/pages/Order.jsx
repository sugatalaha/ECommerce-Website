import React, { useState, useEffect } from "react";
import backendUrl from "../constanst/backendUrl.js";
import axios from "axios";
import { toast } from "react-toastify";

export const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/all-orders`, { withCredentials: true });
      if (response.data.success) {
        console.log(response.data.orders);
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {/* Scrollable container for the table */}
      <div className="overflow-y-auto max-h-[calc(100vh-100px)] border border-gray-300 shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b sticky top-0">
            <tr>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Order Status</th>
              <th className="p-3 text-left">Payment Method</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Pin Code</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.address?.firstName || "N/A"}</td>
                  <td className="p-3">{order.address?.lastName || "N/A"}</td>
                  <td className="p-3">
                    <ul>
                      {Object.entries(order.items).map(([itemId, itemData]) => (
                        <li key={itemId} className="mb-2 border-b pb-1">
                          <span className="font-semibold">Name:</span> {itemData.itemName}
                          {Object.entries(itemData)
                            .filter(([key]) => key !== "itemName") // Exclude itemName
                            .map(([size, quantity]) => (
                              <div key={size}>
                                <span className="font-semibold">Size:</span> {size} <br />
                                <span className="font-semibold">Quantity:</span> {quantity}
                              </div>
                            ))}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-blue-600 font-medium">{order.status}</td>
                  <td className="p-3">{order.paymentMethod || "N/A"}</td>
                  <td className="p-3">{order.payment ? "✅ Yes" : "❌ No"}</td>
                  <td className="p-3">{order.address?.city || "N/A"}</td>
                  <td className="p-3">{order.address?.country || "N/A"}</td>
                  <td className="p-3">{order.address?.zip || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
