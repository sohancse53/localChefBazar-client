import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner/Spinner";
import { MdDeleteForever, MdOutlineSystemUpdateAlt } from "react-icons/md";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyReviews = () => {
  const [review, setReview] = useState();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const modalRef = useRef();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews?reviewerEmail=${user?.email}`
      );
      return res.data;
    },
  });

  //   console.log(review);
  //  -------------- update a review---------------
  const handleModal = (review) => {
    setReview(review);
    setComment(review.comment || ""); // set the current comment
    setRating(review.rating || ""); // set the current rating
    modalRef.current.showModal();
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const rating = e.target.rating.value;
    const updatedReview = { comment, rating };
    // console.log(updatedReview);
    axiosSecure
      .patch(`/reviews/${review?._id}`, updatedReview)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("review has been updated successfully");
          refetch();
          modalRef.current.close();
          e.target.reset();
        }
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  //   delete a review
  const handleDeleteReview = (review) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${review?._id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success"
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <title>My Reviews</title>
      <h2 className="text-3xl text-center font-bold">
        My Reviews- <span className="text-secondary">{reviews.length}</span>
      </h2>
      {/* table */}
      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>MealName</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {reviews.map((review, index) => (
              <tr key={review._id}>
                <th>{index + 1}</th>
                <td>{review.foodName}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>{review.date}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      handleDeleteReview(review);
                    }}
                    data-tip={`Delete ${review.foodName}`}
                    className="btn btn-xs py-4 bg-red-400 text-white rounded-4xl tooltip tooltip-error"
                  >
                    <MdDeleteForever size={20} />
                    Delete
                  </button>
                  <button
                    onClick={() => handleModal(review)}
                    data-tip={`Update ${review.foodName}`}
                    className="btn btn-xs py-4 btn-primary text-white rounded-4xl tooltip tooltip-primary"
                  >
                    <MdOutlineSystemUpdateAlt size={20} />
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <form onSubmit={handleUpdateReview} className="flex flex-col w-full">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              value={comment}
              className="textarea w-full"
              placeholder="comment"
            ></textarea>

            <label className="text-primary font-bold mt-4">Rating:</label>
            <select
              name="rating"
              onChange={(e) => setRating(e.target.value)}
              className="select w-1/3 mt-1"
            >
              <option defaultValue={review?.rating} value={review?.rating}>
                {review?.rating}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <button type="submit" className="btn btn-primary mt-5">
              Update Review
            </button>
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
    </div>
  );
};

export default MyReviews;
