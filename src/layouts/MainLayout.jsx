import React from 'react';
import Navbar from '../components/Logo/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='relative space-y-10'>
       <div className='bg-primary sticky top-0 w-full z-50'>

           <div className='max-w-10/12 mx-auto'> 
            <Navbar/>
           </div>

       </div>
        <div className='max-w-10/12 mx-auto'>
            <Outlet/>
        </div>

         <div className='bg-base-200 w-full '>

           <div className=' max-w-10/12 mx-auto'> 
            <Footer/>
           </div>

       </div>

        </div>
    );
};

export default MainLayout;