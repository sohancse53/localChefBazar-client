import React from 'react';
import { Link, useNavigate } from 'react-router';
import './Forbidden.css'
const Forbidden = () => {
     const navigate = useNavigate();
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center  px-4 overflow-hidden">
      
      {/* Floating Lock Animation */}
      <div className="relative">
        <div className="animate-bounce-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 h-40 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 10V7a4 4 0 10-8 0v3M5 10h14v10H5V10z"
            />
          </svg>
        </div>

        {/* Soft Glow Animation */}
        <div className="absolute inset-0 rounded-full bg-red-300 opacity-20 blur-3xl animate-pulse"></div>
      </div>

      {/* Text Section */}
      <h1 className="text-8xl font-extrabold text-red-500 mt-4 animate-fade-in">
        403
      </h1>

      <p className="mt-4 text-2xl font-semibold text-gray-800 animate-fade-in-delay">
        Access Forbidden
      </p>

      <p className="mt-2 text-gray-600 max-w-md text-center animate-fade-in-delay-2">
        You don’t have permission to access this page.  
        Please contact the administrator if you think this is an error.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-3 animate-fade-in-delay-3">
        <Link to="/" className="btn btn-accent ">Go Home</Link>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      {/* Bottom Fade Animation */}
     
    </div>
    );
};

export default Forbidden;