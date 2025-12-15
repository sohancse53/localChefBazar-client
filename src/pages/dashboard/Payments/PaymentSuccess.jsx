import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
     const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
   useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;

    axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        console.log('payment updated', res.data);
      });
  }, [axiosSecure, searchParams]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center h-[60vh]">
      <h2 className="text-2xl font-bold text-green-600">
        ✅ Payment Successful
      </h2>
      <Link to='/dashboard/my-orders' className='btn btn-success p-5
       text-white'>Back to My Order Page</Link>
    </div>
    );
};

export default PaymentSuccess;