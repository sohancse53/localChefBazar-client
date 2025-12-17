import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("admin/statistics");
      return res.data;
    },
  });

  if (isLoading || !user || loading) return <Spinner />;

  const cardData = [
    { name: "Total Users", value: stats?.totalUsers, fill: "#0088FE" },
    { name: "Total Payments", value: stats?.totalPaymentAmount, fill: "#00C49F" },
    { name: "Pending Orders", value: stats?.ordersPending, fill: "#FFBB28" },
    { name: "Delivered Orders", value: stats?.ordersDelivered, fill: "#FF8042" },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <title>Statistics</title>
      <h2 className="text-xl sm:text-3xl text-center font-bold my-5 text-primary">
        Platform Statistics
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center bg-white hover:shadow-xl transition"
          >
            <p className="text-gray-500 text-sm sm:text-base">{card.name}</p>
            <p className="text-xl sm:text-2xl md:text-3xl text-secondary font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center items-center my-10 w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={cardData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              minAngle={10}
              label
            >
              {cardData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
