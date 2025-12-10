import React from 'react';
import Navbar from '../components/Logo/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className=''>
       <div className='bg-primary'>

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