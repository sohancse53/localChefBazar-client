import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner/Spinner";
import { PiChefHatFill } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";
import toast, { ToastBar } from "react-hot-toast";

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


  const handleRoleRequest = (role)=>{
    // console.log(id,role);
    const roleRequestInfo = {
      userName: person.displayName,
      userEmail:person.email,
      requestType:role,
      requestStatus: "pending",
      requestTime: new Date(),
    }
    console.log(roleRequestInfo);

    axiosSecure.post('/role-request',roleRequestInfo)
    .then(res=>{
      if(res.data.insertedId){
        toast.success(`request as ${role} has been sent`);
      }else{
        toast.error(`You Have already requested for the ${role} role`);
      }
    })
    .catch(err=>{
      toast.error('Something went wrong');
    })


  }




  if (isLoading) return <Spinner />;


  return (
<div className="min-h-screen ">
  <title>My Profile</title>
  {/* Cover Image */}
  <div className="w-full h-56 bg-gradient-to-r from-primary to-secondary relative rounded-b-3xl shadow-lg ">
    {/* Profile Picture */}
    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 transition-transform duration-500 hover:scale-105">
      <img
        src={person.photoURL}
        alt="Profile"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover"
      />
    </div>
  </div>

  {/* Profile Content */}
  <div className="mt-20 max-w-5xl mx-auto px-4 md:px-0">
    <div className="bg-white backdrop-blur-md bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 transition-all duration-300">
      
      {/* Left Column */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">
          {person.displayName}{" "}
          {person.role === "chef" && (
            <span className="text-sm md:text-base font-light text-primary">({person.chefId})</span>
          )}
        </h1>
        <p className="text-gray-600 text-center md:text-left break-words">{person.email}</p>

        {/* Address */}
        <div className="mt-4 w-full text-center md:text-left">
          <p className="text-sm text-gray-400">Address</p>
          <p className="bg-primary/20 text-primary font-medium p-2 rounded-2xl shadow-sm">
            {person.address}
          </p>
        </div>

        {/* Role & Status */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
          <span className="px-4 py-1 rounded-full bg-primary/90 text-white font-semibold shadow-sm">
            {person.role}
          </span>
          <span
            className={`px-4 py-1 rounded-full font-semibold shadow-sm ${
              person.status === "active"
                ? "bg-secondary/90 text-white"
                : "bg-secondary/50 text-white/80"
            }`}
          >
            {person.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
          {person.role !== "admin" && (
            <>
              {person.role === "user" && (
                <button
                  onClick={() => handleRoleRequest("chef")}
                  className="btn rounded-2xl bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-5 py-2 text-sm sm:text-base shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Be a Chef <PiChefHatFill size={20} />
                </button>
              )}

              <button
                onClick={() => handleRoleRequest("admin")}
                className="btn rounded-2xl bg-secondary hover:bg-secondary/90 text-white flex items-center gap-2 px-5 py-2 text-sm sm:text-base shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Be an Admin <MdAdminPanelSettings size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Right Column */}
  {/* Right Column */}
<div className="w-full md:w-2/3 flex flex-col gap-6">
  {/* Profile Details Card */}
  <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border-l-4 border-primary transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center mb-4 flex-wrap">
      <h2 className="font-bold text-primary text-lg md:text-xl flex-1 flex items-center gap-2 break-words">
        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 016 6v2a6 6 0 11-12 0V8a6 6 0 016-6z" />
        </svg>
        Profile Details
      </h2>
    </div>
    <div className="space-y-3 overflow-x-auto">
      <p className="flex items-center gap-2 text-gray-800 break-words">
        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
        </svg>
        <span className="font-medium text-primary flex-shrink-0">Email:</span> {person.email}
      </p>
      <p className="flex items-center gap-2 text-gray-800 break-words">
        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 7h14v10H3V7z M10 3a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
        <span className="font-medium text-primary flex-shrink-0">Address:</span> {person.address}
      </p>
      <p className="flex items-center gap-2 text-gray-800 break-words">
        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 3a2 2 0 00-2 2v12h12V5a2 2 0 00-2-2H6z" />
        </svg>
        <span className="font-medium text-primary flex-shrink-0">Role:</span> {person.role}
      </p>
      <p className="flex items-center gap-2 text-gray-800 break-words">
        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
        </svg>
        <span className="font-medium text-primary flex-shrink-0">Status:</span>
        <span
          className={`font-semibold px-2 py-0.5 rounded-full ${
            person.status === "active"
              ? "bg-primary/80 text-white"
              : "bg-red-500/80 text-white"
          }`}
        >
          {person.status}
        </span>
      </p>
      {person.role === "chef" && (
        <p className="flex items-center gap-2 text-gray-800 break-words">
          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3h12v2H4V3z" />
          </svg>
          <span className="font-medium text-primary flex-shrink-0">Chef ID:</span> {person.chefId}
        </p>
      )}
    </div>
  </div>

  {/* Recent Activities Card */}
  <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border-l-4 border-secondary transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center mb-4 flex-wrap">
      <h2 className="font-bold text-secondary text-lg md:text-xl flex-1 flex items-center gap-2 break-words">
        <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6h16v2H2V6z M2 10h16v2H2v-2z M2 14h16v2H2v-2z" />
        </svg>
        Recent Activities
      </h2>
      <span className="text-secondary text-sm font-medium">Latest</span>
    </div>
    <ul className="space-y-2">
      <li className="flex items-center gap-2 text-gray-700 break-words">
        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
        </svg>
        Posted a new recipe
      </li>
      {person.status === "fraud" && (
        <li className="flex items-center gap-2 text-red-500 font-semibold break-words">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
          </svg>
          Fraudulent activity detected
        </li>
      )}
      <li className="flex items-center gap-2 text-gray-700 break-words">
        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4h10v2H5V4z" />
        </svg>
        Updated profile info
      </li>
    </ul>
  </div>
</div>

    </div>
  </div>
</div>
  );
};

export default MyProfile;
