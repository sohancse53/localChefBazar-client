import React from 'react';
import DailyDeals from '../../components/DailyDeals/DailyDeals';
import Banner from '../../components/Banner/Banner';
import ReviewSection from '../../components/ReviewSection/ReviewSection';
import NewsLetterSection from '../../components/NewsLetterSection/NewsLetterSection';

const Home = () => {
    return (
        <div className='space-y-2'>
            <Banner/>
            <DailyDeals/>
            <ReviewSection/>
            <NewsLetterSection/>
        </div>
    );
};

export default Home;