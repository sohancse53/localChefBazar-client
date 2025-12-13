import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";

const CreateMeal = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: person, isLoading } = useQuery({
    queryKey: ["person", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);

      return res.data[0];
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreateMeal = (data) => {};

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-secondary">
        Create a Meal
      </h2>

      {/* form */}
      <form
        className="max-w-xl shadow p-5 mx-auto mt-5 rounded space-y-2"
        onSubmit={handleSubmit(handleCreateMeal)}
      >
        {/* Food Name */}
        <label className="label">Food Name</label>
        <input
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
          placeholder="Food Price"
          type="text"
          className="input w-full"
          {...register("foodPrice", {
            required: "please enter Food price",
            min: {
              value: 1,
              message: "Price must be greater than 0",
            },
          })}
        />

        {errors.foodPrice && (
          <p className="text-red-400">{errors.foodPrice.message}</p>
        )}

        {/* Food rating */}
        <label className="label">Rating</label>
        <input
          placeholder="rating"
          type="number"
          className="input w-full"
          {...register("rating", {
            required: "please enter Food rating",
            min: {
              value: 0,
              message: "Price must be greater than 0",
            },max:{value:5,message:'price must be lower than 6'},
          })}
        />

        {errors.rating && (
          <p className="text-red-400">{errors.rating.message}</p>
        )}

         {/* Ingredients  */}
            <label className="label">ingredients specify with comma</label>
            <input
              
              placeholder="add ingredients here"
              type="text"
              className="input w-full"
              {...register("ingredients",{required:"add at least one ingredients"})}
            />
             {errors.ingredients && (
          <p className="text-red-400">{errors.ingredients.message}</p>
        )}


        <div className="flex flex-col lg:flex-row gap-2">
          <div>
            {/* Chef Name */}
            <label className="label">Chef Name</label>
            <input
              readOnly
              defaultValue={person.displayName}
              placeholder="Chef Name"
              type="text"
              className="input w-full"
              {...register("chefName")}
            />
          </div>
          <div>
            {/* Chef Id */}
            <label className="label">Chef ID</label>
            <input
              readOnly
              defaultValue={person.chefId}
              placeholder="Chef Name"
              type="text"
              className="input w-full"
              {...register("chefId")}
            />
          </div>
          <div>
            {/* Chef email */}
            <label className="label">Chef Email</label>
            <input
              readOnly
              defaultValue={person.email}
              placeholder="Chef email"
              type="text"
              className="input w-full"
              {...register("email")}
            />
          </div>
        </div>

        {/* foodImage */}
        <label className="label">Upload Food Image</label>
        <input
          type="file"
          className="file-input w-full"
          {...register("foodImage", { required: "Please Upload an Image" })}
        />
        {errors.foodImage && (
          <p className="text-red-400">{errors.foodImage.message}</p>
        )}

        <button className="btn btn-primary  mt-4" type="submit">
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
