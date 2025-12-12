import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever, MdOutlineSystemUpdateAlt } from "react-icons/md";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";

const MyFavorite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/favorite-food?userEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDeleteFavorite = (id) => {
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
        axiosSecure.delete(`/favorite-food/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your favorite food has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };


  if(isLoading){
    return <Spinner/>
  }


  return (
    <div>
      <h2 className="text-3xl text-center font-bold">
        My favorites- <span className="text-secondary">{favorites.length}</span>
      </h2>
      {/* table */}
      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>MealName</th>
              <th>Chef Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {favorites.map((favorite, index) => (
              <tr key={favorite._id}>
                <th>{index + 1}</th>
                <td>{favorite.foodName}</td>
                <td>{favorite.chefName}</td>
                <td>{favorite.price}</td>
                <td>{favorite.addedTime}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      handleDeleteFavorite(favorite?._id);
                    }}
                    data-tip={`Delete ${favorite.foodName}`}
                    className="btn btn-xs py-4 bg-red-400 text-white rounded-4xl tooltip tooltip-error"
                  >
                    <MdDeleteForever size={20} />
                    Delete
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

export default MyFavorite;
