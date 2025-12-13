import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Spinner from "../../../components/Spinner/Spinner";
import { MdSystemUpdateAlt } from "react-icons/md";
import Swal from "sweetalert2";

const UpdateMeal = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateMeal = (data) => {
    setLoading(true);

    const UpdatedMealInfo = {
      foodName: data.foodName,
      price: data.price,
      rating: data.rating,
      ingredients: data.ingredients,
      chefsExperience: data.chefsExperience,
      estimatedDeliveryTime: data.estimatedDeliveryTime,
      deliveryArea: data.deliveryArea,
    };

    axiosSecure.patch(`/meal/${id}`,UpdatedMealInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${meal?.foodName} has been Updated`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });

    console.log(UpdatedMealInfo);

    setLoading(false);
  };

  if (isLoading || !meal) return <Spinner />;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-secondary">
        Update Meal
      </h2>

      <form
        className="max-w-xl shadow p-5 mx-auto mt-5 rounded space-y-2"
        onSubmit={handleSubmit(handleUpdateMeal)}
      >
        {/* Food Name */}
        <label className="label">Food Name</label>
        <input
          defaultValue={meal.foodName}
          placeholder="Food Name"
          type="text"
          className="input w-full"
          {...register("foodName", { required: "please enter Food name" })}
        />

        {errors.foodName && (
          <p className="text-red-400">{errors.foodName.message}</p>
        )}

        {/* Food price */}
        <label className="label">Food Price</label>
        <input
          defaultValue={meal.price}
          placeholder="Food Price"
          type="number"
          className="input w-full"
          {...register("price", {
            required: "please enter Food price",
            min: {
              value: 1,
              message: "Price must be greater than 0",
            },
          })}
        />

        {errors.price && <p className="text-red-400">{errors.price.message}</p>}

        {/* Food rating */}
        <label className="label">Rating</label>
        <input
          defaultValue={meal.rating}
          placeholder="rating"
          type="number"
          className="input w-full"
          {...register("rating", {
            required: "please enter Food rating",
            min: {
              value: 0,
              message: "Price must be greater than 0",
            },
            max: { value: 5, message: "price must be lower than 6" },
          })}
        />

        {errors.rating && (
          <p className="text-red-400">{errors.rating.message}</p>
        )}

        {/* Ingredients  */}
        <label className="label">ingredients specify with comma</label>
        <input
          defaultValue={meal.ingredients}
          placeholder="add ingredients here"
          type="text"
          className="input w-full"
          {...register("ingredients", {
            required: "add at least one ingredients",
          })}
        />
        {errors.ingredients && (
          <p className="text-red-400">{errors.ingredients.message}</p>
        )}

        {/* ---------------------------- */}

        <div className="flex flex-col lg:flex-row gap-2">
          <div>
            {/* Chef estimated delivery time */}
            <label className="label">Estimated Delivery Time</label>
            <input
              defaultValue={meal.estimatedDeliveryTime}
              placeholder="Estimated Delivery Time"
              type="text"
              className="input w-full"
              {...register("estimatedDeliveryTime", {
                required: "please fill up",
              })}
            />
            {errors.estimatedDeliveryTime && (
              <p className="text-red-400">
                {errors.estimatedDeliveryTime.message}
              </p>
            )}
          </div>
          <div>
            {/* Chef experience */}
            <label className="label">Chef Experience</label>
            <input
              defaultValue={meal.chefsExperience}
              placeholder="Chef Experience"
              type="text"
              className="input w-full"
              {...register("chefsExperience", { required: "please fill up" })}
            />
            {errors.chefsExperience && (
              <p className="text-red-400">{errors.chefsExperience.message}</p>
            )}
          </div>
          <div>
            {/* delivery area */}
            <label className="label">Delivery Area</label>
            <input
              defaultValue={meal.deliveryArea}
              placeholder="Delivery Area"
              type="text"
              className="input w-full"
              {...register("deliveryArea", {
                required: "please set an delivery area",
              })}
            />
            {errors.deliveryArea && (
              <p className="text-red-400">{errors.deliveryArea.message}</p>
            )}
          </div>
        </div>

        {/* ---------------------------- */}

        <button className="btn btn-primary w-full  mt-4" type="submit">
          Update Meal <MdSystemUpdateAlt size={20} />
          {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;
