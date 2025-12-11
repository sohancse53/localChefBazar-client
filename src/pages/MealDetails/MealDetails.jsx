import React, { useRef } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdFavoriteBorder, MdOutlineReviews } from "react-icons/md";
import Reviews from "../Reviews/Reviews";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";

const MealDetails = () => {
  const { user } = useAuth();
  const modalRef = useRef("");
const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, } = useForm()

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: meal } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

   const handleModal = () => {
    modalRef.current.showModal();
  };

  const handleMakeReview = (data) => {
    const reviewInfo = {
      foodId: meal?._id,
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      rating: data.rating,
      comment:data.comment
    }
    axiosSecure.post('/reviews',reviewInfo)
    .then(res=>{
      if(res.data.insertedId){
        toast.success('Review added');
         queryClient.invalidateQueries(["reviews", meal?._id]);
        modalRef.current.close();
      }
    })

  };
 

  const handleFavorite = ()=>{
    const favoriteInfo = {
      userEmail:user?.email,
      foodId:meal?._id,
      foodName:meal?.foodName,
      chefId:meal?.chefId,
      chefName:meal?.chefName,
      price:meal?.price
    }
    axiosSecure.post('/favorite-food',favoriteInfo)
    .then(res=>{
      if(res.data.insertedId){
        toast.success("added to favorite");
      }
      else{
        toast.error('Already added')
      }
    })
   
  }



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
            className="rounded-2xl w-80 h-80 object-cover shadow-md"
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
          <div className="flex gap-4 flex-wrap items-center">
            {/* order button */}
            <Link to={`/order/${meal?._id}`} className="btn btn-xs  btn-primary">Order Now</Link>

            {/* review button */}
            <button onClick={handleModal} className="btn btn-xs  btn-secondary">
              Review <MdOutlineReviews />
            </button>

            {/* favorite button */}
            <button onClick={handleFavorite} data-tip="Add to favorite" className="tooltip btn   btn-circle text-primary">
              <FaHeart size={20} color="red"/>  
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
          <h3 className="font-bold text-lg mb-5">Add a Review</h3>
          <form onSubmit={handleSubmit(handleMakeReview)} className="flex flex-col  w-full">
            <textarea {...register('comment',{required:true})} className="textarea w-full" placeholder="comment"></textarea>
            {
              errors.comment && <p className="text-red-400">Please write comment</p>
            }
            <label className="text-primary font-bold">Rating: </label>
            <select {...register('rating')} defaultValue="Medium" className="select w-1/3">
              <option disabled={true}>Give Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <button type="submit" className="btn btn-primary mt-5">Add Review</button>
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
      <Reviews  foodId={meal?._id}/>
    </div>
  );
};

export default MealDetails;
