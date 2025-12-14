import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className=" bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col">

  {/* Header */}
  <div className="flex items-start justify-between mb-4 flex-1">
    <div>
      <h2 className="text-lg font-bold text-gray-900">
        {order?.foodName}
      </h2>
      <p className="text-xs text-gray-500 mt-1">
        {order?._id}
      </p>
    </div>

    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
        order?.orderStatus === "delivered"
          ? "bg-green-100 text-green-700"
          : order?.orderStatus === "preparing"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {order?.orderStatus}
    </span>
  </div>

  {/* Divider */}
  <div className="border-t border-dashed my-4"></div>

  {/* Order Info */}
  <div className="grid grid-cols-2 gap-3 text-sm">
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-gray-500">Price</p>
      <p className="font-semibold text-gray-900">${order?.price}</p>
    </div>

    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-gray-500">Quantity</p>
      <p className="font-semibold text-gray-900">{order?.quantity}</p>
    </div>

    <div className="bg-gray-50 rounded-lg p-3 col-span-2">
      <p className="text-gray-500">Order Time</p>
      <p className="font-semibold text-gray-900">
        {new Date(order?.orderTime).toLocaleString()}
      </p>
    </div>

    <div className="bg-gray-50 rounded-lg p-3 col-span-2">
      <p className="text-gray-500">Payment Status</p>
      <p
        className={`font-semibold ${
          order?.paymentStatus === "paid"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {order?.paymentStatus}
      </p>
    </div>
  </div>

  {/* Chef Info */}
  <div className="flex items-center justify-between mt-5  rounded-xl p-3">
    <div>
      <p className="text-xs text-primary ">Chef</p>
      <p className="font-semibold text-primary ">
        {order?.chefName}
      </p>
    </div>

    <div className="text-right">
      <p className="text-xs text-primary ">Chef ID</p>
      <p className="font-semibold text-primary ">
        {order?.chefId}
      </p>
    </div>
  </div>

  {/* Action */}
  {order?.paymentStatus !== "paid" && (
    <button className="mt-5  btn bg-primary  text-white py-2.5 rounded-xl font-semibold hover:bg-primary/80  transition">
      Pay Now
    </button>
  )}
</div>


  );
};

export default OrderCard;
