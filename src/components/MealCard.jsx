import { Link } from "react-router";

const MealCard = ({ meal }) => {
  return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Food Image */}
      <div className="relative flex-1">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-44 object-cover"
        />
        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center">
          <span>⭐</span>
          <span className="ml-0.5">{meal.rating}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-base font-semibold text-primary mb-1 line-clamp-1">
          {meal.foodName}
        </h2>

        <p className="text-xs text-gray-600 mb-0.5">
          Chef: <span className="font-medium text-gray-800">{meal.chefName}</span>
        </p>

        <p className="text-xs text-gray-600 mb-3">
          Delivery: <span className="font-medium text-gray-800">{meal.deliveryArea}</span>
        </p>

        <div className="mt-auto flex justify-between items-center">
          <div className="text-primary font-bold text-lg">${meal.price}</div>
          <Link
            to={`/meal-details/${meal._id}`}
            className="px-3 py-1.5 rounded-lg bg-secondary text-white text-xs font-medium hover:bg-[#e5867f] transition-colors duration-200 whitespace-nowrap"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
