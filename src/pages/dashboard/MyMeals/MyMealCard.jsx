import React from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router";

const MyMealCard = ({ meal }) => {
  if (!meal) {
    return <Spinner />;
  }
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-primary/10">

  {/* Food Image */}
  <div className="relative">
    <img
      src={meal.foodImage}
      alt={meal.foodName}
      className="h-48 w-full object-cover"
    />

    {/* Rating Badge */}
    <span className="absolute top-3 right-3 bg-primary text-white text-sm px-3 py-1 rounded-full">
      ⭐ {meal.rating}
    </span>
  </div>

  {/* Content */}
  <div className="p-4 space-y-3">

    {/* Food Name & Price */}
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-primary">
        {meal.foodName}
      </h2>
      <span className="text-lg font-bold text-secondary">
        ${meal.price}
      </span>
    </div>

    {/* Ingredients */}
    <p className="text-sm text-gray-600">
      <span className="font-medium text-primary">
        Ingredients:
      </span>{" "}
      {meal.ingredients}
    </p>

    {/* Delivery Time */}
    <p className="text-sm text-gray-600 flex items-center gap-1">
      ⏱️
      <span className="font-medium text-primary">
        Delivery:
      </span>
      {meal.estimatedDeliveryTime}
    </p>

    {/* Chef Info */}
    <div className="text-sm text-gray-700 border-t border-primary/10 pt-3">
      <p>
        <span className="font-medium text-primary">
          Chef:
        </span>{" "}
        {meal.chefName}
      </p>
      <p>
        <span className="font-medium text-primary">
          Chef ID:
        </span>{" "}
        {meal.chefId}
      </p>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-3 pt-3">
      <Link to={`/dashboard/update-meal/${meal._id}`}
       
        className="flex-1 btn btn-primary hover:bg-[#012a10] text-white py-2 rounded-xl transition"
      >
        Update
      </Link>

      <button
        onClick={() => console.log("Delete", meal._id)}
        className="flex-1 btn bg-secondary hover:bg-[#e38782] text-white py-2 rounded-xl transition"
      >
        Delete
      </button>
    </div>

  </div>
</div>

  );
};

export default MyMealCard;
