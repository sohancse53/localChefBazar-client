import React from "react";
import { FaEnvelope } from "react-icons/fa";

const NewsLetterSection = () => {
  return (
    <div className="py-30 px-10 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
      <div className="max-w-4xl mx-auto text-center">
        {/* Gradient Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Join Our Foodie Family
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Get exclusive offers, new recipe alerts, and early access to seasonal menus — straight to your inbox.
        </p>

        {/* Email Form */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent shadow-sm transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-[#e5867f] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Subscribe
          </button>
        </div>

        {/* Privacy Note */}
        <p className="mt-6 text-xs text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsLetterSection;