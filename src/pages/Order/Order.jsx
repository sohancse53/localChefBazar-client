import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import Fraud from "../../components/Fraud/Fraud";
import Forbidden from "../../components/Forbidden/Forbidden";

const Order = () => {
  const {role} = useRole();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLoaderData();
  const orderTime = new Date();
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: meal } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

  // Unique Region list
  const uniqueRegion = [...new Set(location.map((l) => l.region))];

  // Get cities based on Region
  const handleRegion = (region) => {
    const filteredRegion = location.filter((l) => l.region === region);
    return filteredRegion.map((r) => r.city);
  };

  // Reset form when meal + user data loads
  useEffect(() => {
    if (meal && user) {
      reset({
        foodName: meal.foodName,
        price: meal.price,
        chefId: meal.chefId,
        userEmail: user.email,
        userRegion: "",
        userCity: "",
        userArea: "",
        quantity: "",
      });
    }
  }, [meal, user, reset]);

  // Submit handler
  const handleOrder = (data) => {
    // order object
    const orderInfo = {
      foodId: meal?._id,
      foodName: data.foodName,
      price: data.price,
      chefName:meal.chefName,
      chefId: data.chefId,
      paymentStatus: "pending",
      userEmail: data.userEmail,
      userArea: data.userArea,
      userCity: data.userCity,
      userRegion: data.userRegion,
      orderStatus: "pending",
      orderTime: orderTime,
      userAddress: `${data.userArea}, ${data.userCity}, ${data.userRegion}`,
      quantity: data.quantity,
    };

    const cost = data.quantity * data.price;

    // post to DB using yes no sweet Alert
    Swal.fire({
      title: "Are you sure?",
      text: `Total cost for this Order is Tk ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm  Order!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/orders", orderInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Confirmed!",
              text: "Your Order has been Confirmed.",
              icon: "success"
            });
            navigate('/dashboard/my-orders');
          }
        });
      }
    });

    // console.log(orderInfo);
  };

  if(role.status==='fraud') return <Forbidden/>

  return (
    <div className="mt-5">
      <title>Order food</title>
      <h2 className="text-3xl font-bold text-center text-primary">
         ORDER <br /> <span className="text-secondary">{meal?.foodName}</span>
      </h2>

      <form onSubmit={handleSubmit(handleOrder)}>
        <fieldset className="lg:max-w-[40%] mx-auto space-y-1 shadow p-5 mt-5 rounded-xl">
          {/* Meal Name */}
          <label className="label">Meal Name</label>
          <input
            readOnly
            type="text"
            className="input w-full"
            {...register("foodName")}
          />

          <div className="flex gap-5 flex-col md:flex-row">
            {/* Price */}
            <div className="flex-1">
              <label className="label">Price</label>
              <input
                readOnly
                type="text"
                className="input w-full"
                {...register("price")}
              />
            </div>

            {/* Quantity */}
            <div className="flex-1">
              <label className="label">Quantity</label>
              <input
                type="number"
                className="input w-full"
                {...register("quantity", {
                  required: "Quantity is required",
                  validate: {
                    positive: (v) =>
                      parseInt(v) > 0 || "Quantity must be greater than 0",
                    integer: (v) =>
                      Number.isInteger(Number(v)) ||
                      "Quantity must be a whole number",
                  },
                })}
              />
              {errors.quantity && (
                <p className="text-red-500">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          {/* Chef ID */}
          <label className="label">Chef ID</label>
          <input
            readOnly
            type="text"
            className="input w-full"
            {...register("chefId")}
          />

          {/* Email */}
          <label className="label">Email</label>
          <input
            readOnly
            type="email"
            className="input w-full"
            {...register("userEmail")}
          />

          {/* Region */}
          <label className="label">Region</label>
          <select
            className="select w-full"
            {...register("userRegion", { required: "Region is required" })}
          >
            <option value="" disabled>
              Select Region
            </option>
            {uniqueRegion.map((region, i) => (
              <option key={i} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.userRegion && (
            <p className="text-red-500">{errors.userRegion.message}</p>
          )}

          {/* City */}
          <label className="label">City</label>
          <select
            className="select w-full"
            {...register("userCity", { required: "City is required" })}
          >
            <option value="" disabled>
              Select City
            </option>
            {handleRegion(watch("userRegion")).map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.userCity && (
            <p className="text-red-500">{errors.userCity.message}</p>
          )}

          {/* Area */}
          <label className="label">Area</label>
          <input
            type="text"
            className="input w-full"
            {...register("userArea", { required: "Area is required" })}
          />
          {errors.userArea && (
            <p className="text-red-500">{errors.userArea.message}</p>
          )}

          {/* Order Time */}
          <label className="label">Order Time</label>
          <input
            readOnly
            value={orderTime.toLocaleString()}
            type="text"
            className="input w-full"
          />

          <button className="btn btn-primary  mt-4" type="submit">
            Confirm Your Order
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Order;
