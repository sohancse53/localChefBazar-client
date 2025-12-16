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
    data: meals = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["meals", sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals?sortOrder=${sortOrder}`);
      return res.data;
    },
  });

  const handleSort = (e) => {
    console.log(e.target.value);
    SetSortOrder(e.target.value);
    refetch();
  };

  console.log(currentPage);

  return (
    <div className="my-5 space-y-5 relative">
      <div className="flex  flex-col md:flex-row items-center gap-5 justify-center">
        <h2 className="text-2xl  font-bold">
          Meals: <span className="text-secondary">{meals.length}</span>
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
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}

      {/* pagination */}
      <div className=" flex  gap-2  justify-center overflow-x-scroll">
      {
        currentPage > 0 &&
          <button onClick={() => setCurrentPage(currentPage - 1)}>
          <FaAngleLeft className="btn btn-circle btn-xs md:btn-md" size={20} />
        </button>
      }
        {[
          ...Array(10)
            .keys()
            .map((i) => (
              <p
                onClick={() => setCurrentPage(i)}
                className={`btn btn-xs md:btn-md  ${
                  currentPage == i ? "bg-primary text-white" : ""
                }`}
              >
                {i + 1}
              </p>
            )),
        ]}
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          <FaAngleRight className="btn btn-circle btn-xs md:btn-md " size={20} />
        </button>
      </div>
    </div>
  );
};

export default Meals;
