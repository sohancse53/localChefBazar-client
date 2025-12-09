import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const {user} = useAuth()
    const links = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>Meals</Link></li>
        <li><Link to='/'>Dashboard</Link></li>
    </>
    return (
      <div className="navbar bg-primary shadow-sm text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
            {links}
      </ul>
    </div>
       <Logo/>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        {links}
    </ul>
  </div>
  <div className="navbar-end space-x-2">
    {
        user?
        <div className='flex gap-2 items-center'>
        <button className='btn btn-sm text-primary'>Sign Out</button>
        <img className='w-12 h-12 rounded-full border border-white object-center' src={user?.photoURL} alt="" />
        </div>
        :
        <>
        <Link className='btn text-primary' to="/auth-layout/login">Login</Link>
    <Link className='btn text-primary' to="/auth-layout/register">Register</Link>
        </>
    }
  </div>
</div>
    );
};

export default Navbar;