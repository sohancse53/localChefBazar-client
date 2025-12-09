import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    console.log(data);
    const imgbbURl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    const photo = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // store image and get photo url
        const formdata = new FormData();
        formdata.append("image", photo);

        axios.post(imgbbURl, formdata).then((result) => {
          console.log(result.data.data.url);
          const photoURL = result.data.data.url;
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          //   user crearte in DB
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created", res.data.insertedId);
            }
          });

          updateUserProfile(userProfile)
            .then(() => {
              console.log("profile updated");
              navigate(location.state || "/");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const password = watch("password");

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-4xl">Register</legend>

          {/* email */}
          <label className="label">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* name */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="input"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* photo */}
          <label className="label">Profile Image</label>
          <input
            {...register("photo", { required: "Photo is required" })}
            type="file"
            className="file-input"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}

          {/* address */}
          <label className="label">Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            type="text"
            className="input"
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  "Password must contain at least 1 uppercase and 1 lowercase letter",
              },
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* confirm password */}
          <label className="label">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            className="input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button className="btn btn-primary mt-4">Register</button>

          <p className="text-center text-lg">
            Already Have an Account?{" "}
            <Link to="/auth-layout/login" className="text-primary font-bold">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
