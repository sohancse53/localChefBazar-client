import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <div className="min-h-[80vh] flex justify-center items-center">
        <form>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-4xl">Login</legend>

            {/* email */}
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />

     

        

            {/* password */}
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
           

            <button className="btn btn-primary mt-4">Login</button>
            <p className="text-center text-lg">Don't Have an Account <Link to="/auth-layout/register" className="text-primary font-bold">Register</Link></p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
