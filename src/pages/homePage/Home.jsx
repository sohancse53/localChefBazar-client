import React from 'react';
import DailyDeals from '../../components/DailyDeals/DailyDeals';
import Banner from '../../components/Banner/Banner';

const Home = () => {
    return (
        <div>
            <Banner/>
            <DailyDeals/>
        </div>
    );
};

export default Home;