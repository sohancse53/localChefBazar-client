import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../hooks/useAxios";
import MealCard from "../MealCard";
import Spinner from "../Spinner/Spinner";
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
const DailyDeals = () => {
  const axiosInstance = useAxios();
  const { data: dailyMeals = [], isLoading } = useQuery({
    queryKey: ["daily-meals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/daily-meals");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 🌟 Layered Header: Simulated Parallax Scroll Reveal */}
      <div className="text-center mb-10 relative">
        {/* Background decorative element (moves slower → parallax illusion) */}
        <Slide 
          direction="down" 
          delay={0} 
          duration={800}
          triggerOnce
          fraction={0.3}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-10"
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-primary to-secondary blur-3xl"></div>
        </Slide>

        <Zoom delay={200} triggerOnce fraction={0.4}>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-8"></div>
        </Zoom>

        <Slide direction="up" delay={300} triggerOnce fraction={0.3}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent 
                         bg-gradient-to-r from-primary via-primary/80 to-secondary">
            Daily Meals
          </h2>
        </Slide>

        <Fade direction="up" delay={400} cascade damping={0.08} triggerOnce fraction={0.4}>
          <p className="text-xl md:text-2xl font-medium text-gray-700 max-w-2xl mx-auto">
            <span className="text-primary font-semibold">Delicious</span> meals curated just for 
            <span className="text-secondary font-semibold"> you</span>! 🍽️
          </p>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Stay <span className="text-primary">healthy</span>, stay <span className="text-secondary">happy</span> — and savor every bite.
          </p>
        </Fade>
      </div>

      {/* 🍽️ Meal Grid — Card Reveal with Depth & Stagger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dailyMeals.map((meal, index) => (
          <Fade
            key={meal._id}
            delay={500 + index * 80}
            duration={700}
            triggerOnce
            fraction={0.2} // triggers earlier (as soon as 20% in view)
            className="will-change-transform"
            style={{
              // Simulate depth: cards farther back start smaller & lower
              transform: `translateY(20px) scale(0.98)`,
            }}
          >
            <MealCard meal={meal} />
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default DailyDeals;
