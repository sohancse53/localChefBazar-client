import React from 'react';
import Navbar from '../components/Logo/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='relative'>
       <div className='bg-primary sticky top-0 w-full z-50'>

           <div className='max-w-10/12 mx-auto'> 
            <Navbar/>
           </div>

       </div>
        <div className='max-w-10/12 mx-auto'>
            <Outlet/>
        </div>
        </div>
    );
};

export default MainLayout;