import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MealCard from "../../components/MealCard";
import Spinner from "../../components/Spinner/Spinner";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Meals = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, SetSortOrder] = useState("");

  const axiosSecure = useAxiosSecure();
const {
  data: meals = { result: [], count: 0 },
  isLoading,
} = useQuery({
  queryKey: ["meals", sortOrder, currentPage],
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/meals?sortOrder=${sortOrder}&limit=10&skip=${currentPage * 10}`
    );
    return res.data;
  },
});

  const totalPages = Math.ceil(meals.count / 10);
  const handleSort = (e) => {
    console.log(e.target.value);
    SetSortOrder(e.target.value);
   
  };


  console.log(currentPage);


  return (
    <div className="my-5 space-y-5 relative">
      <title>Meals</title>
      <div className="flex  flex-col md:flex-row items-center gap-5 justify-center">
        <h2 className="text-2xl  font-bold">
          Meals: <span className="text-secondary">{meals.count}</span>
        </h2>

        {/* sort btn */}
        <select
          onChange={handleSort}
          defaultValue="Sort by Price"
          className="select "
        >
          <option disabled={true}>Sort by Price</option>
          <option>Sort By Ascending</option>
          <option>Sort By Descending</option>
        </select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {meals.result.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}

      {/* pagination starts */}
       <div className="flex gap-5 justify-center items-center">
       
         
          <button disabled={currentPage < 1 ?true:false} className="tooltip btn btn-outline btn-xs md:btn-md " data-tip="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
          <FaAngleLeft  size={20} />
        </button>
     
      {/* numbers */}
      <div className="flex gap-1 flex-wrap items-center justify-center">
     
        {[
          ...Array(totalPages)
            .keys()
            .map((i) => (
              <p key={i}
                onClick={() => setCurrentPage(i)}
                className={`btn btn-xs md:btn-md rounded-full ${
                  currentPage == i ? "bg-primary text-white" : ""
                }`}
              >
                {i + 1}
              </p>
            )),
        ]}
       
      </div>
       <button disabled={currentPage + 1 >= totalPages} className="tooltip btn btn-outline btn-xs md:btn-md " data-tip="Next" onClick={() => setCurrentPage(currentPage + 1)}>
          <FaAngleRight  size={20} />
        </button>
       </div>
      {/* pagination ends */}

       
    </div>
  );
};

export default Meals;
