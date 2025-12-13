import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";
import axios from "axios";
import toast from "react-hot-toast";

const CreateMeal = () => {
  const [loading,setLoading]=useState(false);
  const [foodImage,setFoodImage] = useState();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: person, isLoading } = useQuery({
    queryKey: ["person", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);

      return res.data[0];
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const handleCreateMeal =async (data) => {
    setLoading(true);
    const imgbbURl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
    const photo = data.photo[0]
    const formdata = new FormData();
    formdata.append('image',photo)
    // console.log(photo);

    const res =await axios.post(imgbbURl,formdata)
    const imageUrl = res.data.data.url;
    console.log(imageUrl);

    const mealInfo = {
      foodName: data.foodName,
      price:data.price,
      rating:data.rating,
      ingredients:data.ingredients,
      chefName:data.chefName,
      chefId:data.chefId,
      chefEmail:data.chefEmail,
      chefsExperience:data.chefsExperience,
      estimatedDeliveryTime:data.estimatedDeliveryTime,
      foodImage:imageUrl,
      deliveryArea:data.deliveryArea,
      createdAt:new Date()
    }

   axiosSecure.post('/meals',mealInfo)
    .then(res=>{
      if(res.data.insertedId){
        toast.success('Meal added');
        setLoading(false)
      }
    })
    .catch(err=>{
      toast.error(`something went wrong ${err.message}`);
    })


    console.log(mealInfo);

  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-secondary">
        Create a Meal
      </h2>

      {/* form */}
      <form
        className="max-w-xl shadow p-5 mx-auto mt-5 rounded space-y-2"
        onSubmit={handleSubmit(handleCreateMeal)}
      >
        {/* Food Name */}
        <label className="label">Food Name</label>
        <input
          placeholder="Food Name"
          type="text"
          className="input w-full"
          {...register("foodName", { required: "please enter Food name" })}
        />

        {errors.foodName && (
          <p className="text-red-400">{errors.foodName.message}</p>
        )}

        {/* Food price */}
        <label className="label">Food Price</label>
        <input
          placeholder="Food Price"
          type="number"
          className="input w-full"
          {...register("price", {
            required: "please enter Food price",
            min: {
              value: 1,
              message: "Price must be greater than 0",
            },
          })}
        />

        {errors.price && (
          <p className="text-red-400">{errors.price.message}</p>
        )}

        {/* Food rating */}
        <label className="label">Rating</label>
        <input
          placeholder="rating"
          type="number"
          className="input w-full"
          {...register("rating", {
            required: "please enter Food rating",
            min: {
              value: 0,
              message: "Price must be greater than 0",
            },max:{value:5,message:'price must be lower than 6'},
          })}
        />

        {errors.rating && (
          <p className="text-red-400">{errors.rating.message}</p>
        )}

         {/* Ingredients  */}
            <label className="label">ingredients specify with comma</label>
            <input
              
              placeholder="add ingredients here"
              type="text"
              className="input w-full"
              {...register("ingredients",{required:"add at least one ingredients"})}
            />
             {errors.ingredients && (
          <p className="text-red-400">{errors.ingredients.message}</p>
        )}


        <div className="flex flex-col lg:flex-row gap-2">
          <div>
            {/* Chef Name */}
            <label className="label">Chef Name</label>
            <input
              readOnly
              defaultValue={person.displayName}
              placeholder="Chef Name"
              type="text"
              className="input w-full"
              {...register("chefName")}
            />
          </div>
          <div>
            {/* Chef Id */}
            <label className="label">Chef ID</label>
            <input
              readOnly
              defaultValue={person.chefId}
              placeholder="Chef Name"
              type="text"
              className="input w-full"
              {...register("chefId")}
            />
          </div>
          <div>
            {/* Chef email */}
            <label className="label">Chef Email</label>
            <input
              readOnly
              defaultValue={person.email}
              placeholder="Chef email"
              type="text"
              className="input w-full"
              {...register("chefEmail")}
            />
          </div>
        </div>

        {/* photo */}
        <label className="label">Upload Food Image</label>
        <input
          type="file"
          className="file-input w-full file-input-success"
          {...register("photo", { required: "Please Upload an Image" })}
        />
        {errors.photo && (
          <p className="text-red-400">{errors.photo.message}</p>
        )}


          {/* ---------------------------- */}

          <div className="flex flex-col lg:flex-row gap-2">
          <div>
            {/* Chef estimated delivery time */}
            <label className="label">Estimated Delivery Time</label>
            <input
              
              placeholder="Estimated Delivery Time"
              type="text"
              className="input w-full"
              {...register("estimatedDeliveryTime",{required:"please fill up"})}
            />
             {errors.estimatedDeliveryTime && (
          <p className="text-red-400">{errors.estimatedDeliveryTime.message}</p>
        )}
          </div>
          <div>
            {/* Chef experience */}
            <label className="label">Chef Experience</label>
            <input
            
              placeholder="Chef Experience"
              type="text"
              className="input w-full"
              {...register("chefsExperience",{required:"please fill up"})}
            />
             {errors.chefsExperience && (
          <p className="text-red-400">{errors.chefsExperience.message}</p>
        )}
          </div>
          <div>
            {/* delivery area */}
            <label className="label">Delivery Area</label>
            <input
            
              placeholder="Delivery Area"
              type="text"
              className="input w-full"
              {...register("deliveryArea",{required:"please set an delivery area"})}
            />
             {errors.deliveryArea && (
          <p className="text-red-400">{errors.deliveryArea.message}</p>
        )}
          </div>
       
        </div>

          {/* ---------------------------- */}


        <button className="btn btn-primary  mt-4" type="submit">
          Add Meal {loading&& <span className="loading loading-spinner"></span>}
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
