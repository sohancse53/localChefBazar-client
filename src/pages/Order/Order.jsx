import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Order = () => {

  const location = useLoaderData();
  // console.log(location);
const orderTime = new Date();
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: meal } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

  const uniqueRegion = [...new Set(location.map((l) => l.region))];
  console.log(uniqueRegion);

  const [area,setArea] = useState('');
  console.log(area);

  const handleRegion = (region)=>{
    const filteredRegion = location.filter(l=>l.region === region);
    const  city = filteredRegion.map(r=>r.city);
    return city;
  }
// console.log(orderTime);
  return (
    <div className="mt-5">
        <h2 className="text-3xl font-bold text-center text-primary">Confirm Your Order</h2>
      <fieldset className=" lg:max-w-[40%] mx-auto space-y-1 shadow p-5 mt-5 rounded-xl">
        {/* meal name */}
        <label className="label">Meal Name</label>
        <input 
          defaultValue={meal?.foodName}
          readOnly
          type="text"
          className="input  w-full"
          required
        />

        <div className="flex gap-5
         flex-col md:flex-row">
               <div className="flex-1">
                {/* meal price */}
        <label className="label">Price</label>
        <input 
          defaultValue={meal?.price}
          readOnly
          type="text"
          className="input  w-full"
          required
        />
        </div>
       <div className="flex-1">
         {/* quantity */}
        <label className="label">Quantity</label>
        <input  type="number" className="input  w-full" required />
       </div>
        </div>

        {/* Chef Id */}
        <label className="label">Chef Id</label>
        <input 
          defaultValue={meal?.chefId}
          readOnly
          type="text"
          className="input  w-full"
          required
        />
        {/* user email */}
        <label className="label">Email</label>
        <input 
          defaultValue={user?.email}
          readOnly
          type="email"
          className="input  w-full"
          required
        />


        {/* user location */}
        <label className="label">Region</label>
        <select onChange={(e)=>setArea(e.target.value)} defaultValue="Select Region" className="select w-full">
          <option disabled={true}>Select Region</option>
            {
                uniqueRegion.map((region,i)=><option key={i}>{region}</option>)
            }
          
        </select>

               {/* user city */}
        <label className="label">City</label>
        <select defaultValue="Select city" className="select w-full">
          <option disabled={true}>Select City</option>
            {
                handleRegion(area).map((city,i)=><option key={i}>{city}</option>)
            }
          
        </select>

        {/* area */}
              <label className="label">Area</label>
        <input 
          type="text"
          className="input  w-full"
          required
        />
        {/* orrder time */}
              <label className="label">Order Time</label>
        <input 
        defaultValue={orderTime}
          type="text"
          className="input  w-full"
          
        />
        

      <button className="btn btn-neutral mt-4" type="submit">
        Proceed To Payment
      </button>

      </fieldset>

    </div>
  );
};

export default Order;
