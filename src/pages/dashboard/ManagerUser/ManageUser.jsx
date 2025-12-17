import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner/Spinner";
import { MdDeleteForever } from "react-icons/md";
import { FaUserAltSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  
  // console.log(users);

  const handleFraud = (user) => {
    // console.log(user);
    axiosSecure.patch(`/users/${user?._id}`).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} Fraud!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };



  if (isLoading || !users) return <Spinner />;
  return (
    <div>
      <title>Manage Users</title>
      <h2 className="text-3xl text-center font-bold">
        Total Request- <span className="text-secondary">{users.length}</span>
      </h2>

      {/* table */}
      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>User Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td className="font-semibold">{user.role}</td>
                <td
                  className={
                    user.status === "fraud" ? "text-red-400" : "text-green-600"
                  }
                >
                  {user.status}
                </td>
                <td className="flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleFraud(user)}
                      disabled={user.status === "fraud" ? true : false}
                      data-tip="make fraud"
                      className="btn btn-xs rounded-2xl tooltip tooltip-error"
                    >
                      <FaUserAltSlash size={20} />
                      Make Fraud
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
