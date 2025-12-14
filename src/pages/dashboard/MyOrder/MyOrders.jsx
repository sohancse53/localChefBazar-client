import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import OrderCard from './OrderCard';
import Spinner from '../../../components/Spinner/Spinner';

const MyOrders = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data:orders=[],isLoading} = useQuery({
        queryKey:['my-orders',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/orders?userEmail=${user?.email}`);
            return res.data;
        }
    })

    if(isLoading) return <Spinner/>

    return (
        <div>
           <h1 className='text-3xl font-bold text-center my-4'>My Orders- <span className='text-secondary'>{orders.length}</span></h1>

           <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5' >
            {
                orders.map(order=><OrderCard
                     key={order?._id}
                    order={order}
                />)
            }
           </div>
        </div>
    );
};

export default MyOrders;