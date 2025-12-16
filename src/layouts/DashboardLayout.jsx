import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiSquareQuestion } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import { LuBookHeart } from "react-icons/lu";
import { MdAddCircleOutline, MdManageAccounts, MdOutlineReviews } from "react-icons/md";
import { RiSidebarUnfoldFill } from "react-icons/ri";
import { SiManageiq, SiMyget } from "react-icons/si";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { IoIosStats } from "react-icons/io";

const DashboardLayout = () => {
  const {role} = useRole();
  
  const links = (
    <>
        <li>
        <Link
          to={"/dashboard/my-profile"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My profile"
        >
          <CgProfile size={20}/>
          <span className="is-drawer-close:hidden">My Profile</span>
        </Link>
      </li>


      {/* for admin pages */}
    {
    role.role ==='admin' && <>
    
             <li>
              <Link
                to={"/dashboard/stats"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Platform Statistics"
              >
              <IoIosStats size={20} />
                <span className="is-drawer-close:hidden">Platform Statistics</span>
              </Link>
            </li>


      <li>
        <Link
          to={"/dashboard/manage-request"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Request"
        >
          <SiManageiq size={20}/>
          <span className="is-drawer-close:hidden">Manage Request</span>
        </Link>
      </li>


         <li>
        <Link
          to={"/dashboard/manage-user"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage User"
        >
          <MdManageAccounts size={20}/>
          <span className="is-drawer-close:hidden">Manage User</span>
        </Link>
      </li>
    </>
   }
   

   {/* user pages */}
   {
    role.role === 'user' && 
    <>
       <li>
        <Link
          to={"/dashboard/my-orders"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Orders"
        >
          <FaClipboardList size={20}/>
          <span className="is-drawer-close:hidden">My Orders</span>
        </Link>
      </li>


      <li>
        <Link
          to={"/dashboard/my-reviews"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My reviews"
        >
          <MdOutlineReviews size={20}/>
          <span className="is-drawer-close:hidden">My Reviews</span>
        </Link>
      </li>

      <li>
        <Link
          to={"/dashboard/my-favorite"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Favorite Meals"
        >
          <LuBookHeart size={20}/>
          <span className="is-drawer-close:hidden">My Favorite Meals</span>
        </Link>
      </li>
      </>
   }

      {
        role.role === 'chef' && <>
        
        <li>
        <Link
          to={"/dashboard/create-meal"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Create a Meal"
        >
          <MdAddCircleOutline size={20}/>
          <span className="is-drawer-close:hidden">Create a Meal</span>
        </Link>
      </li>

      <li>
        <Link
          to={"/dashboard/meal-order-request"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Meal Order request"
        >
          <CiSquareQuestion size={20}/>
          <span className="is-drawer-close:hidden">Meal Order request</span>
        </Link>
      </li>


      <li>
        <Link
          to={"/dashboard/my-meals"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Meals"
        >
          <SiMyget size={20}/>
          <span className="is-drawer-close:hidden">My Meals</span>
        </Link>
      </li>

        </>
      }

      

    </>
  );

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex items-center ">
          <label
          data-tip="Side Bar"
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost tooltip tooltip-right tooltip-info"
          >
            {/* Sidebar toggle icon */}
            <RiSidebarUnfoldFill  size={25} />
          </label>
          <Link to={"/"} className="text-xl font-semibold text-primary">
            Home Page 
          </Link>
        </nav>
        {/* Page content here */}
        <div className="p-4 max-w-11/12 mx-auto">
          {/* outlet pages */}
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
         

            {/* List item */}

            {
              // add links here
              links
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
