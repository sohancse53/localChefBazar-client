import React from 'react';
import DailyDeals from '../../components/DailyDeals/DailyDeals';
import Banner from '../../components/Banner/Banner';
import ReviewSection from '../../components/ReviewSection/ReviewSection';
import NewsLetterSection from '../../components/NewsLetterSection/NewsLetterSection';
import { useNavigation } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
    const navigation = useNavigation();
    // console.log(navigation.state);
   
    return (
        <div className='space-y-2'>
            <title>Home</title>
            <Banner/>
            <DailyDeals/>
            <ReviewSection/>
            <NewsLetterSection/>
        </div>
    );
};

export default Home;