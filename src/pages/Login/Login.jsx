import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {signInUser} = useAuth();
     const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const handleLogin = (data)=>{
        // console.log(data.email);
        signInUser(data.email,data.password)
        .then(()=>{
            toast.success('login successful')
            navigate(location.state || '/')
        })
        .catch(err=>{
            toast.error(err.message)
        })
        
      }

  return (
    <div>
      <div className="min-h-[80vh] flex justify-center items-center">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-4xl">Login</legend>

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

     

        

          {/* password */}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
           

            <button className="btn btn-primary mt-4">Login</button>
            <p className="text-center text-lg">Don't Have an Account <Link to="/auth-layout/register" className="text-primary font-bold">Register</Link></p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
