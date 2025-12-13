import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner/Spinner";
import MyMealCard from "./MyMealCard";

const MyMeals = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
     const { data: meals ,isLoading} = useQuery({
    queryKey: ["meals",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`meals?chefEmail=${user.email}`);
      return res.data;
    },
  });


  if(isLoading) return <Spinner/>
  return (
    <div>
      <h2 className="text-3xl text-center font-bold">
        My Meals- <span className="text-secondary">{meals.length}</span>
      </h2>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {meals.map((meal) => (
          <MyMealCard key={meal._id} meal={meal} />
        ))}
      </div>

    </div>
  );
};

export default MyMeals;
