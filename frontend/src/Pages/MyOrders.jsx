import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";

export const MyOrders = () => {
  const { orders } = useContext(ShopContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {/* Scrollable Table */}
      <div className="overflow-x-auto border border-gray-300 shadow-md rounded-lg">
        <table className="w-full bg-white border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr className="text-left">
              <th className="p-4 w-1/3">Items</th>
              <th className="p-4 w-1/6">Status</th>
              <th className="p-4 w-1/6">Payment</th>
              <th className="p-4 w-1/6">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <ul>
                      {Object.entries(order.items).map(([itemId, itemData]) => (
                        <li key={itemId} className="mb-2">
                          <p className="font-semibold">Name: {itemData.itemName}</p>
                          {Object.entries(itemData)
                            .filter(([key]) => key !== "itemName")
                            .map(([size, quantity]) => (
                              <p key={size} className="text-sm text-gray-600">
                                <span className="font-semibold">Size:</span> {size} | <span className="font-semibold">Quantity:</span> {quantity}
                              </p>
                            ))}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-blue-600 font-medium">{order.status}</td>
                  <td className="p-4 text-center">
                    {order.payment ? "✅ Paid" : "❌ Pending"}
                  </td>
                  <td className="p-4 text-center font-semibold">${order?.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
