import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
              <title>Payment Cancel</title>
            <h2 className='text-3xl'>Payment Cancel please try again</h2>
            <Link className='btn bg-primary text-white' to="/dashboard/my-orders">Try again</Link>
        </div>
    );
};

export default PaymentCancel;