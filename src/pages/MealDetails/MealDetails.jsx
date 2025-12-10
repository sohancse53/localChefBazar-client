import React, { useRef } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdFavoriteBorder, MdOutlineReviews } from "react-icons/md";
import Reviews from "../Reviews/Reviews";
import useAuth from "../../hooks/useAuth";

const MealDetails = () => {
  const { user } = useAuth();
  const modalRef = useRef("");

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: meal } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

  const handleMakeReview = () => {
    console.log("click");
  };

  const handleModal = () => {
    modalRef.current.showModal();
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      {/* Breadcrumb / Navigation */}
      <div className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-green-800">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/meals" className="hover:text-green-800">
          Meals
        </Link>{" "}
        / <span className="font-semibold text-gray-800">{meal?.foodName}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-lg rounded-2xl p-6 md:p-10">
        {/* Food Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={meal?.foodImage}
            alt={meal?.foodName}
            className="rounded-2xl w-full h-auto object-cover shadow-md"
          />
        </div>

        {/* Meal Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#023A15] mb-2">
              {meal?.foodName}
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Chef: <span className="font-semibold">{meal?.chefName}</span>
            </p>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-xl font-semibold text-[#F09C96]">
                ${meal?.price}
              </p>
              <p className="text-yellow-500 font-medium">⭐ {meal?.rating}</p>
            </div>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Ingredients:</span>{" "}
              {meal?.ingredients}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Delivery Area:</span>{" "}
              {meal?.deliveryArea}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Estimated Delivery Time:</span>{" "}
              {meal?.estimatedDeliveryTime}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Chef Experience:</span>{" "}
              {meal?.chefsExperience} years
            </p>
          </div>

          {/* Some  Buttons */}
          <div className="flex gap-4 flex-wrap">
            {/* order button */}
            <button className="btn btn-xs  btn-primary">Order Now</button>

            {/* review button */}
            <button onClick={handleModal} className="btn btn-xs  btn-secondary">
              Review <MdOutlineReviews />
            </button>

            {/* favorite button */}
            <button className="btn  btn-xs text-primary">
              Add to favorite <MdFavoriteBorder />
            </button>
          </div>
        </div>
      </div>

      {/* modal section starts */}

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box ">
          <h3 className="font-bold text-lg">Add a Review</h3>
          <form className="flex flex-col gap-5 w-full">
            <textarea className="textarea w-full" placeholder="comment"></textarea>
            <label className="text-primary font-bold">Rating</label>
            <select defaultValue="Medium" className="select w-1/3">
              <option disabled={true}>Give Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
           
            </select>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* modal section ends */}

      {/* review section */}
      <Reviews />
    </div>
  );
};

export default MealDetails;
