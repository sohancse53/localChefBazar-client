import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 border border-gray-200 hover:shadow-2xl transition-all duration-300">
      
      {/* Comment */}
      <p className="text-gray-700 text-sm italic break-words max-h-32 overflow-y-auto">
        "{review?.comment}"
      </p>

      {/* Footer: Reviewer Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4 sm:gap-0">
        
        {/* Reviewer */}
        <div className="flex items-center gap-3">
          <img
            src={review?.reviewerImage}
            alt={review?.reviewerName}
            className="w-16 h-16 rounded-full border-2 border-secondary object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">{review?.reviewerName}</h3>
            <p className="text-xs text-gray-500">{review?.date}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${
                i < review?.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({review?.rating})</span>
        </div>

      </div>
    </div>
  );
};

export default ReviewCard;
