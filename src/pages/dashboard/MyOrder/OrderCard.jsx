import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl border border-gray-200 p-5 hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
  {/* Food Name & Status */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-primary-600">{order?.foodName}</h2>
    <span
      className={`px-3 py-1 text-sm font-semibold rounded-full ${
        order?.orderStatus === "delivered"
          ? "bg-green-100 text-green-800"
          : order?.orderStatus === "preparing"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {order?.orderStatus}
    </span>
  </div>

  {/* Order Details */}
  <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm mb-4">
    <div className="bg-primary-50 p-2 rounded-lg shadow-sm">
      <p className="font-medium text-primary-700">Price</p>
      <p className="font-semibold">${order?.price}</p>
    </div>
    <div className="bg-secondary-50 p-2 rounded-lg shadow-sm">
      <p className="font-medium text-secondary-700">Quantity</p>
      <p className="font-semibold">{order?.quantity}</p>
    </div>
    <div className="bg-primary-50 p-2 rounded-lg shadow-sm">
      <p className="font-medium text-primary-700">Delivery Time</p>
      <p className="font-semibold">{new Date(order?.orderTime).toLocaleString()}</p>
    </div>
    <div className="bg-secondary-50 p-2 rounded-lg shadow-sm">
      <p className="font-medium text-secondary-700">Payment Status</p>
      <p className="font-semibold">{order?.paymentStatus}</p>
    </div>
  </div>

  {/* Chef Info */}
  <div className="border-t pt-3 mt-3 flex justify-between text-gray-600 text-sm">
    <div className="bg-primary-50 p-2 rounded-lg shadow-sm">
      <p className="font-medium text-primary-700">Chef</p>
      <p className="font-semibold">{order?.chefName}</p>
    </div>
    <div className="bg-secondary-50 p-2 rounded-lg shadow-sm">
      <p className="font-medium text-secondary-700">Chef ID</p>
      <p className="font-semibold">{order?.chefId}</p>
    </div>
  </div>

  {/* Action Badge */}
  <div className="mt-4 flex justify-end">
    <span className="bg-primary-100 text-primary-800 px-4 py-1 text-sm font-semibold rounded-full shadow-md hover:bg-primary-200 transition-colors">
      Pay Now
    </span>
  </div>
</div>

  );
};

export default OrderCard;
