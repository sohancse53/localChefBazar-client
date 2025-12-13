import { Link } from "react-router";

const MealCard = ({ meal }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
      {/* Food Image */}
      <div className="relative flex-1">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-44 object-cover"
        />
        {/* Optional: small rating badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
          ⭐ {meal.rating}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-primary mb-1">{meal.foodName}</h2>

        <p className="text-sm text-gray-600 mb-1">
          Chef: <span className="font-medium text-gray-800">{meal.chefName}</span>
        </p>

        <p className="text-sm text-gray-600 mb-3">
          Delivery: <span className="font-medium text-gray-800">{meal.deliveryArea}</span>
        </p>

        <div className="flex justify-between items-center">
          <div className="text-primary font-semibold">${meal.price}</div>

          <Link to={`/meal-details/${meal._id}`} className="btn btn-sm px-4 py-1 rounded-lg bg-secondary text-white text-sm hover:bg-[#e5867f] transition">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
