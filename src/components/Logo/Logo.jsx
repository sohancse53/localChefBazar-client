import React from 'react';
import logo from '../../assets/Logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link  to="/">
        <figure className='w-20 h-20 rounded-full'>
            <img className='w-full h-full' src={logo} alt="Local Chef Bazar" />
        </figure>
        </Link>
    );
};

export default Logo;