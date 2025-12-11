import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ReviewCard from './ReviewCard';

const Reviews = ({foodId}) => {
    const axiosSecure = useAxiosSecure()
    const {data:reviews=[]} = useQuery({
        queryKey:['reviews',foodId],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/reviews?foodId=${foodId}`)
            return res.data
        }
    })
    return (
        <div>
           <h2 className='text-2xl text-primary font-bold my-5'>Watch Reviews for this food- {reviews.length}</h2>

            <div className='grid lg:grid-cols-2 gap-2'>
                {
                    reviews.map(review=><ReviewCard key={review?._id}
                    review ={review}
                    />)
                }
            </div>
        </div>
    );
};

export default Reviews;