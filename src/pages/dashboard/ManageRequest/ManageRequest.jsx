import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { FcAcceptDatabase, FcApprove, FcDisapprove } from "react-icons/fc";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role-request`);
      return res.data;
    },
  });

  // -----------------------  approve a role request----------------
  const handleApprove = (request) => {
    axiosSecure
      .patch(`/role-request/${request._id}/approved`, {
        requestType: request.requestType,
        userEmail: request.userEmail,
      })
      .then((res) => {
        if (res.data.alreadyApproved) {
          return toast.error("Already approved");
        }

        if (
          res.data.updateRequest.modifiedCount > 0 ||
          res.data.updateUserResult.modifiedCount > 0
        ) {
          toast.success("Request Approved");
          refetch();
        } else {
          toast.error("Nothing changed");
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };



// ------------------reject status-----------------------------------
const handleRejected = (request) => {
  axiosSecure
    .patch(`/role-request/${request._id}/rejected`)
    .then((res) => {
      if (res.data.alreadyRejected) {
        toast.error("Already rejected");
        return;
      }

      if (res.data.modifiedCount > 0) {
        toast.success("The request has been rejected");
        refetch();
      }
    })
    .catch(() => toast.error("Something went wrong"));
};




  if (isLoading) return <Spinner />;

  return (
    <div>
      <title>Manage Requests</title>
      <h2 className="text-3xl text-center font-bold">
        Total Request- <span className="text-secondary">{requests.length}</span>
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
              <th>Request Type</th>
              <th>Request Status</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {requests.map((request, index) => (
              <tr key={request._id}>
                <th>{index + 1}</th>
                <td>{request.userName}</td>
                <td>{request.userEmail}</td>
                <td>{request.requestType}</td>
                <td className={`font-semibold ${request.requestStatus==='approved'?'text-green-500':request.requestStatus==='rejected'?'text-red-400':'text-black'}`}>{request.requestStatus}</td>
                <td>{request.requestTime}</td>
                <td className="flex  flex-col gap-2">
                  <button
                   disabled = {request.requestStatus==='approved' || request.requestStatus==='rejected'?true:false}
                    onClick={() => {
                      handleApprove(request);
                    }}
                    data-tip={`Approve Request`}
                    className="btn btn-xs py-4   rounded-4xl tooltip tooltip-success"
                  >
                    Approve
                    <FcApprove size={25} />
                  </button>
                  <button
                  disabled = {request.requestStatus==='approved' || request.requestStatus==='rejected'?true:false}
                  onClick={()=>handleRejected(request)}
                    data-tip={`Reject Request`}
                    className="btn btn-xs py-4   rounded-4xl tooltip "
                  >
                    Reject
                    <FcDisapprove size={25} />
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

export default ManageRequest;
