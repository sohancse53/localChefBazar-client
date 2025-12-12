import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner/Spinner";
import { PiChefHatFill } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: person, isLoading } = useQuery({
    queryKey: ["person", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);

      return res.data[0];
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left: User Image */}
      <div className="w-full md:w-1/3 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-8">
        <img
          src={person.photoURL}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-center"
        />
      </div>

      {/* Right: User Details */}
      <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {person.displayName}
        </h1>
        <p className="text-gray-500 mt-1 break-words">{person.email}</p>

        <div className="mt-6 space-y-4">
          {/* Address */}
          <div>
            <p className="text-sm text-gray-400">Address</p>
            <p className="text-gray-800 font-medium break-words">
              {person.address}
            </p>
          </div>

          <div className="flex gap-5">
            {/* Role */}
            <div>
              <p className="text-sm text-gray-400">Role</p>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                {person.role}
              </span>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full font-semibold ${
                  person.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {person.status}
              </span>
            </div>
          </div>

          {/* action buttons */}
          <div className="flex gap-2 items-center">
            {person.role !== "admin" && (
              <>
                {person.role === "user" && (
                  <button className="btn rounded-xl text-primary">
                    Be a Chef <PiChefHatFill size={20} />
                  </button>
                )}

                <button className="btn rounded-xl text-primary">
                  Be an Admin <MdAdminPanelSettings size={20} />
                </button>
              </>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
