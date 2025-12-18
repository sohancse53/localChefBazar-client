import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";
import Spinner from "../../../components/Spinner/Spinner";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { GrDeliver } from "react-icons/gr";
import toast from "react-hot-toast";

const MealOrderRequest = () => {
  const [loading, setLoading] = useState(false);
  const { role } = useRole();
  // console.log(role?.chefId);
  const chefId = role?.chefId;

  const axiosSecure = useAxiosSecure();
  const {
    data: requestMeals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal-request", chefId],
    queryFn: async () => {
      const res = await axiosSecure.get(`orders?chefId=${chefId}`);
      return res.data;
    },
  });

  const handleAccept = (meal) => {
    setLoading(true);
    // console.log(meal);
    axiosSecure
      .patch(`/order/accept/${meal._id}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Order has Accepted");
          setLoading(false);
          refetch();
        } else {
          toast("Already accepted");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  };

  const handleCancel = (meal) => {
    setLoading(true);
    // console.log(meal);
    axiosSecure
      .patch(`/order/cancel/${meal._id}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Order has been Cancelled");
          setLoading(false);
          refetch();
        } else {
          toast("Already cancelled");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  };

  const handleDeliver = (meal) => {
    setLoading(true);
    // console.log(meal);
    axiosSecure
      .patch(`/order/deliver/${meal._id}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success(`${meal?.foodName} has been Delivered`);
          setLoading(false);
          refetch();
        } else {
          toast("Already Delivered");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  };

  if (isLoading || !role) return <Spinner />;
  return (
    <div>
      <title>Meal Order Requests</title>
      <h1 className="text-3xl font-bold text-center my-4">
        Order Request-{" "}
        <span className="text-secondary">{requestMeals.length}</span>
      </h1>

      {/* table */}
      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>MealName</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Order Status</th>
              <th>Customer Email</th>
              <th>Customer Address</th>
              <th>Order Time</th>
              <th>Payment Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {requestMeals.map((meal, index) => (
              <tr key={meal._id}>
                <th>{index + 1}</th>
                <td>{meal.foodName}</td>
                <td>${meal.price}</td>
                <td>{meal.quantity}</td>
                <td
                  className={`capitalize text-lg font-semibold ${
                    meal.orderStatus === "accepted" ||
                    meal.orderStatus === "delivered"
                      ? "text-green-400"
                      : meal.orderStatus === "cancelled"
                      ? "text-red-400"
                      : "text-black"
                  }`}
                >
                  {meal.orderStatus}
                </td>
                <td>{meal.userEmail}</td>
                <td>{meal.userAddress}</td>
                <td>{new Date(meal.orderTime).toLocaleString()}</td>
                <td>{meal.paymentStatus}</td>
                <td className="flex flex-col gap-4">
                  {/* Cancel */}
                  <button
                    onClick={() => handleCancel(meal)}
                    disabled={meal?.orderStatus !== "pending"}
                    data-tip="Cancel Order"
                    className={`btn btn-xs py-4 text-white rounded-4xl tooltip tooltip-error
      ${
        meal?.orderStatus !== "pending"
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-red-400"
      }`}
                  >
                    <MdCancel size={20} />
                    Cancel
                  </button>

                  {/* Accept */}
                  <button
                    onClick={() => handleAccept(meal)}
                    disabled={meal?.orderStatus !== "pending"}
                    data-tip="Accept Order"
                    className={`btn btn-xs py-4 text-white rounded-4xl tooltip
      ${
        meal?.orderStatus !== "pending"
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-success"
      }`}
                  >
                    <TiTick size={20} />
                    Accept
                  </button>

                  {/* Deliver */}
                  <button
                    onClick={() => handleDeliver(meal)}
                    disabled={meal?.orderStatus !== "accepted"}
                    data-tip="Deliver Order"
                    className={`btn btn-xs py-4 text-white rounded-4xl tooltip
      ${
        meal?.orderStatus !== "accepted"
          ? "bg-gray-300 cursor-not-allowed"
          : "btn-primary"
      }`}
                  >
                    <GrDeliver size={20} />
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealOrderRequest;
